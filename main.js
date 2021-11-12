const { Client, Intents, Collection } = require('discord.js');
const config = require('./config.json');
const mongoose = require('mongoose');

const welcomeModel = require('./src/models/welcomeModel');
const ClientManager = require('./src/ClientManager');
const client = new ClientManager({
  partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
  intents: 32767,
  disableMentions: 'everyone',
});

client.setup();



client.on('guildMemberAdd', guildMember =>{
    const data = await welcomeModel.findOne({
        GuildID: guildMember.guild.id
    });

    let channel = client.channels.cache.get(data.ChannelID);
    let welcomeRole = guildMember.guild.roles.cache.find(data.RoleID);

    guildMember.roles.add(welcomeRole);
    client.channels.cache.get(channel).send(`Hello <@${guildMember.user.id}>, welcome to the server!`)
    client.channels.cache.get(channel).send('https://media.discordapp.net/attachments/908229025099567146/908571572607008788/a.jpg')
});

mongoose
    .connect(config.MONGODB_SRV, {
    })
    .then(() =>{
        console.log('Connected to the database');
    })
    .catch((err) =>{
        console.log(err);
    });