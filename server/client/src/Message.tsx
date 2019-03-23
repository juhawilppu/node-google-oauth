import * as React from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { IMessage } from './Dashboard';

const style = {
    border: '1px solid black',
    margin: '5px',
    padding: '5px'
}

interface Props {
    message: IMessage;
    deleteMessage: any;
}
class Message extends React.Component<Props> {
    render() {
        const message = this.props.message;

        return (
            <div style={style}>
                <IconButton aria-label="Delete" onClick={() => this.props.deleteMessage(message._id)}>
                    <DeleteIcon fontSize="small" />
                </IconButton>
                <h2>{message.title}</h2>
                <div>{message.content}</div>
                <div>Sent by {message.user.email}</div>
            </div>
        )
    }
}

export default Message;