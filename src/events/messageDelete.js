const Discord = require('discord.js');

const modlogModel = require('../models/modlogModel');

module.exports = async (client, message) => {
    const data = await modlogModel.findOne({
        GuildID: message.guild.id
    });

    let channel = client.channels.cache.get(data.channel);
    let sender = message.author.id;

    channel.send(`${sender} deleted ${message}`);
}