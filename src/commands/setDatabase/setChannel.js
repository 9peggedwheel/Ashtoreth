const channelModel = require('../../models/channelModel');

module.exports.run = async (client, message, args) => {
    const channel = message.mentions.channels.first();

    const data = await channelModel.findOne({
        GuildID: message.guild.id
    });

    if (!data) {
        const data = new channelModel({
            GuildID: message.guild.id,
            ChannelID: channel.id,
        });
        data.save();
        message.channel.send(`ok saved`);
    } else {
        await channelModel.deleteOne({
            GuildID: message.guild.id,
        });

        const data = new channelModel({
            GuildID: message.guild.id,
            ChannelID: channel.id,
        });
        data.save();
        message.channel.send(`ok saved`);
    }
}

module.exports.config = {
    name: 'setchannel',
    aliases: []
}