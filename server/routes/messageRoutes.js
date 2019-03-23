const mongoose = require('mongoose');
const Message = mongoose.model('messages');

module.exports = (app) => {
    app.get(
        '/api/messages', async (req, res) => {
            const messages = await Message.find();
            res.send(messages);
        }
    );
    
    app.post(
        '/api/messages',
        async (req, res) => {
            const message = await new Message({ 
                title: req.body.title,
                content: req.body.content,
                user: {
                    userId: req.user.id,
                    email: req.user.email
                }
            }).save();
            res.send(message);
        }
    );

    app.delete('/api/messages/:messageId',
    async (req, res) => {        
        const messageId = req.params.messageId;
        console.log('deleting ' + messageId)
        const r = await Message.deleteOne({ _id: messageId });
        res.send(r);
    }); 

}