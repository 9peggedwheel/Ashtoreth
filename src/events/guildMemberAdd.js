const Discord = require('discord.js');
const welcomeModel = require('../models/welcomeModel');

module.exports = async (member) => {
    const data = await welcomeModel.findOne({
        GuildID: member.guild
    });

    let channel = data.ChannelID;
    let welcomeRole = member.guild.roles.cache.find(data.RoleID);

    member.roles.add(welcomeRole);
    client.channels.cache.get(channel).send(`Hello <@${guildMember.user.id}>, welcome to the server!`)
    client.channels.cache.get(channel).send('https://media.discordapp.net/attachments/908229025099567146/908571572607008788/a.jpg')
}