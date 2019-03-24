import * as React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Message from './Message';
import { Button } from '@material-ui/core';
import PlusIcon from '@material-ui/icons/Add';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';

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
    sent: Date;
}

interface ListOfMessages extends Array<IMessage>{}

interface Props extends RouteComponentProps {
    auth: any;
}
interface State {
    loaded: boolean;
    messages: Array<IMessage>;
}
class Dashboard extends React.Component<Props, State> {
    state = {
        loaded: false,
        messages: [] as ListOfMessages
    }

    componentDidMount() {
        axios.get('/api/messages')
        .then(response => {
            this.setState({ loaded: true, messages: response.data as ListOfMessages });
        });
    }

    deleteMessage = async (messageId : string) => {
        const message = this.state.messages.find(m => m._id === messageId) as IMessage;
        await axios.delete(`/api/messages/${message._id}`);
        const messages = this.state.messages.filter(m => m._id !== messageId);
        this.setState({messages});
    }

    render() {

        const content = this.state.loaded ? (
            <React.Fragment>
                <Button variant="contained" color="primary" onClick={() => this.props.history.push(`/messages/new`)}>
                    <PlusIcon style={styles.leftIcon} /> Write a message
                </Button>
                <div style={{marginTop: '50px'}}>
                    {this.state.messages.map(message => <Message key={message._id} message={message} deleteMessage={this.deleteMessage} />)}
                    {this.state.messages.length == 0 ? <div>No messages</div> : null}
                </div>
            </React.Fragment>
        ) : (
            <div style={{marginTop: '50px'}}>
                <CircularProgress />
            </div>
        )

        return (
            <div style={{width: '500px'}}>
                <h2>Messages</h2>
                {content}
            </div>
        )
    }
}

const mapStateToProps = (val : any) => {
    return { auth: val.auth };
}

export default connect(mapStateToProps)(withRouter(Dashboard));