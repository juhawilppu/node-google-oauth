import * as React from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { IMessage } from './Dashboard';

const style = {
    floating: {
        float: "right" as any
    },
    container: {
        border: '1px solid black',
        margin: '5px',
        padding: '10px',
        borderRadius: '5px',
        width: '400px'
    }
}

interface Props {
    message: IMessage;
    deleteMessage: any;
}
class Message extends React.Component<Props> {
    render() {
        const message = this.props.message;

        return (
            <div style={style.container}>
                <div style={style.floating}>
                    <IconButton aria-label="Delete" onClick={() => this.props.deleteMessage(message._id)}>
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                </div>
                <h3 style={{marginTop: '10px', marginBottom: '10px'}}>{message.title}</h3>
                <div>{message.content}</div>
                <div style={{marginTop: '10px', display: 'flex', justifyContent: 'flex-end'}}>{message.user.email}</div>
            </div>
        )
    }
}

export default Message;