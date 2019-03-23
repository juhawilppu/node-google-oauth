import * as React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Message from './Message';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

interface Props {
    auth: any;
}
interface State {
    loaded: boolean;
    messages: Array<any>;
    writeMessage: boolean;
    title: string;
    content: string;
}
class Dashboard extends React.Component<Props, State> {
    state = {
        loaded: false,
        messages: [],
        writeMessage: false,
        title: '',
        content: ''
    }

    componentDidMount() {
        axios.get('/api/messages')
        .then(response => {
            this.setState({ loaded: true, messages: response.data });
        });
    }

    sendMessage = async () => {
        const message = {
            title: this.state.title,
            content: this.state.content
        }
        const response = await axios.post('/api/messages', message) as any;
        const messages = [...this.state.messages] as any;
        messages.push(response.data);
        this.setState({
            writeMessage: false,
            title: '',
            content: '',
            messages
        })
    }

    cancelMessage() {
        this.setState({
            writeMessage: false,
            title: '',
            content: ''
        });
    }

    renderNewMessage = () => (
        <form noValidate autoComplete="off">
            <TextField
                id="standard-title"
                label="Title"
                value={this.state.title}
                onChange={event => this.setState({ title: event.target.value })}
                margin="normal"
            /><br />
            <TextField
                id="standard-title"
                label="Content"
                value={this.state.content}
                onChange={event => this.setState({ content: event.target.value })}
                margin="normal"
            />
            <div>
                <Button variant="contained" color="primary" onClick={this.sendMessage}>Send</Button>
                <Button variant="contained" onClick={this.cancelMessage}>Cancel</Button>
            </div>
        </form>
    )

    render() {

        if (!this.state.loaded) {
            return <div>...</div>
        }

        return (
            <div>
                <h2>Messages</h2>
                {this.state.writeMessage ?
                    this.renderNewMessage()
                 : 
                 <Button onClick={() => this.setState({writeMessage: true})}>New message</Button>
                }
                {this.state.messages.map(message => <Message message={message} />)}
                {this.state.messages.length == 0 ? <div>No messages</div> : null}
            </div>
        )
    }
}

const mapStateToProps = (val : any) => {
    return { auth: val.auth };
}

export default connect(mapStateToProps)(Dashboard);