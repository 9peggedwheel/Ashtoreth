const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js');

const modlogModel = require('../models/modlogModel');

module.exports = async (client, message) => {
    const data = await modlogModel.findOne({
        GuildID: message.guild.id
    });

    let channel = client.channels.cache.get(data.ChannelID);
    let sender = message.author.id;

    // channel.send(`Messaged deleted by <@${sender}> in ${channel}: ${message}`);
    const newEmbed = new MessageEmbed()
        .setColor('#E7FAFE').
        addFields(
            {name: `${sender} just deleted a message!`, value: `**Messaged deleted by <@${sender}> in ${channel}**` + "\n" + `${message}`},
        );

    channel.send({ embeds: [newEmbed] });
}