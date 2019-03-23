import * as React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Message from './Message';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import PlusIcon from '@material-ui/icons/Add';
import SendIcon from '@material-ui/icons/Send';
import CancelIcon from '@material-ui/icons/Cancel';

const styles = {
    leftIcon: {
        marginRight: '10px'
    }
}

export interface IMessage {
    _id: string;
    title: string;
    content: string;
    user: any;
}

interface ListOfMessages extends Array<IMessage>{}

interface Props {
    auth: any;
}
interface State {
    loaded: boolean;
    messages: Array<IMessage>;
    writeMessage: boolean;
    title: string;
    content: string;
}
class Dashboard extends React.Component<Props, State> {
    state = {
        loaded: false,
        messages: [] as ListOfMessages,
        writeMessage: false,
        title: '',
        content: ''
    }

    componentDidMount() {
        axios.get('/api/messages')
        .then(response => {
            this.setState({ loaded: true, messages: response.data as ListOfMessages });
        });
    }

    sendMessage = async () => {
        const message = {
            title: this.state.title,
            content: this.state.content
        }
        const response = await axios.post('/api/messages', message) as any;
        const m  = response.data as IMessage;
        const messages = [...this.state.messages] as ListOfMessages;
        messages.push(m);
        this.setState({
            writeMessage: false,
            title: '',
            content: '',
            messages: messages
        })
    }

    cancelMessage = () => {
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
    )

    deleteMessage = async (messageId : string) => {
        const message = this.state.messages.find(m => m._id === messageId) as IMessage;
        await axios.delete(`/api/messages/${message._id}`);
        const messages = this.state.messages.filter(m => m._id !== messageId);
        this.setState({messages});
    }

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
                 <Button variant="contained" color="primary" onClick={() => this.setState({writeMessage: true})}>
                    <PlusIcon style={styles.leftIcon} /> Write a message
                 </Button>
                }
                <div style={{marginTop: '50px'}}>
                    {this.state.messages.map(message => <Message key={message._id} message={message} deleteMessage={this.deleteMessage} />)}
                    {this.state.messages.length == 0 ? <div>No messages</div> : null}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (val : any) => {
    return { auth: val.auth };
}

export default connect(mapStateToProps)(Dashboard);