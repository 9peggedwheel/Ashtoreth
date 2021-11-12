const mongoose = require('mongoose');

const channelSchema = new mongoose.Schema({
    GuildID: String,
    ChannelID: String,
    RoleID: String
});

const MessageModel = module.exports = mongoose.model('welcomeModel', channelSchema);