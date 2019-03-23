import * as React from 'react';

interface Props {
    message: any;
}
class Message extends React.Component<Props> {
    render() {
        const message = this.props.message;

        return (
            <div>
                <h2>{message.title}</h2>
                <div>{message.content}</div>
                <div>Sent by {message.user.email}</div>
            </div>
        )
    }
}

export default Message;