const Discord = require('discord.js');
const welcomeModel = require('../models/welcomeModel');

module.exports = async (member) => {
    const data = await welcomeModel.findOne({
        GuildID: member.guild
    });
    console.log(member);
    let channel = member.guild.channels.cache.get(data.ChannelID);
    let welcomeRole = member.guild.roles.cache.find(data.RoleID);

    member.roles.add(welcomeRole);
    client.channels.cache.get(channel.id).send(`Hello <@${member.user.id}>, welcome to the server!`)
    client.channels.cache.get(channel.id).send('https://media.discordapp.net/attachments/908229025099567146/908571572607008788/a.jpg')
}