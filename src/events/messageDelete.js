const Discord = require('discord.js');

const channelModel = require('../models/modlogModel');

module.exports = async (client, message) => {
    const data = await modlogModel.findOne({
        GuildID: message.guild.id
    });

    let channel = client.channels.cache.get();
    let sender = message.author.id;

    channel.send(`${sender} deleted ${message}`);
}