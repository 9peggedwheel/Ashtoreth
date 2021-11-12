const mongoose = require('mongoose');

const channelSchema = new mongoose.Schema({
    GuildID: String,
    RoleID: String
});

const MessageModel = module.exports = mongoose.model('memberModel', channelSchema);