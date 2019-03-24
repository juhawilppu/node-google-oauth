import * as React from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { IMessage } from './Messages';
import Moment from 'react-moment';

const style = {
    floating: {
        float: "right" as any
    },
    container: {
        border: '1px solid black',
        padding: '10px',
        borderRadius: '5px',
        width: '100%',
        maxWidth: '500px',
        marginTop: '10px'
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
                <h3 style={{marginTop: '0px', marginBottom: '0px'}}>{message.title}</h3>
                <div style={{marginTop: '10px'}}>{message.content}</div>
                <div style={{marginTop: '25px', display: 'flex', justifyContent: 'space-between', color: 'grey'}}>
                    <div>
                        <Moment format="DD-MM-YYYY HH:mm:ss" date={message.sent} />
                    </div>
                    <div>
                        {message.user.email}
                    </div>
                </div>
            </div>
        )
    }
}

export default Message;