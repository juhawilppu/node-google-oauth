import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';
import CancelIcon from '@material-ui/icons/Cancel';

const styles = {
    leftIcon: {
        marginRight: '10px'
    }
}

interface Props extends RouteComponentProps {

}
interface State {
    title: string;
    content: string;
}
class NewMessage extends React.Component<Props, State> {
    state = {
        title: '',
        content: ''
    }

    sendMessage = async () => {
        const message = {
            title: this.state.title,
            content: this.state.content
        }
        const response = await axios.post('/api/messages', message) as any;
        this.props.history.push(`/messages`);
    }

    cancelMessage = () => {
        this.props.history.push(`/messages`);
    }

    render() {
        return (
            <div style={{width: '500px'}}>
                <h2>New message</h2>
                <div style={{marginTop: '50px'}}>
                    <form noValidate autoComplete="off">
                        <TextField
                            id="standard-title"
                            label="Title"
                            variant="outlined"
                            value={this.state.title}
                            onChange={event => this.setState({ title: event.target.value })}
                            margin="normal"
                        /><br />
                        <TextField
                            id="standard-title"
                            label="Content"
                            variant="outlined"
                            multiline
                            rows="4"
                            value={this.state.content}
                            onChange={event => this.setState({ content: event.target.value })}
                            margin="normal"
                        />
                        <div style={{marginTop: '20px'}}>
                            <Button variant="contained" color="primary" style={styles.leftIcon} onClick={this.sendMessage}>
                                <SendIcon style={styles.leftIcon} /> Send
                            </Button>
                            <Button variant="contained" onClick={this.cancelMessage}>
                                <CancelIcon style={styles.leftIcon} /> Cancel
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default withRouter(NewMessage);