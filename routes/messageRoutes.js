const mongoose = require('mongoose');
const Message = mongoose.model('messages');
const requireLogin = require('../middlewares/requireLogin');
const Mailer = require('../services/Mailer');
const template = require('../services/emailTemplates/messageTemplate');

module.exports = (app) => {
    app.get(
        '/api/messages',
        requireLogin,
        async (req, res) => {
            const messages = await Message.find();
            res.send(messages);
        }
    );
    
    app.post(
        '/api/messages',
        requireLogin,
        async (req, res) => {
            const message = await new Message({ 
                title: req.body.title,
                content: req.body.content,
                user: {
                    userId: req.user.id,
                    email: req.user.email
                },
                sent: Date.now()
            }).save();

            const email = {
                subject: message.title,
                recipients: [ message.user.email ]
            }

            const mailer = new Mailer(email, template(message));
            await mailer.send();

            res.send(message);
        }
    );

    app.delete(
        '/api/messages/:messageId',
        requireLogin,
        async (req, res) => {
            const messageId = req.params.messageId;
            const r = await Message.deleteOne({ _id: messageId });
            res.send(r);
        }
    );

}