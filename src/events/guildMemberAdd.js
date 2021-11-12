const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js');

const welcomeModel = require('../models/welcomeModel');

module.exports = async (client, member) => {
    const data = await modlogModel.findOne({
        GuildID: member.guild.id
    });

    let channel = client.channels.cache.get(data.ChannelID);
    let welcomeRole = member.guild.roles.cache.find(data.RoleID);

    member.roles.add(welcomeRole);
    client.channels.cache.get(channel).send(`Welcome <@${guildMember.user.id}> to the server!`)
    client.channels.cache.get(channel).send('https://media.discordapp.net/attachments/908229025099567146/908571572607008788/a.jpg')
}