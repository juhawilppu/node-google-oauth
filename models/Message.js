const mongoose = require('mongoose');
const { Schema } = mongoose;

const messageSchema = new Schema({
    title: String,
    content: String,
    sent: Date,
    user: {
        id: String,
        email: String
    }
});

mongoose.model('messages', messageSchema);