const { Client, Intents, Collection } = require('discord.js');
const config = require('./config.json');
const mongoose = require('mongoose');

const ClientManager = require('./src/ClientManager');
const client = new ClientManager({
  partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
  intents: 32767,
  disableMentions: 'everyone',
});

client.setup();


// client.on('guildMemberAdd', guildMember =>{
//     let welcomeRole = guildMember.guild.roles.cache.find(role => role.name === 'Member');

//     guildMember.roles.add(welcomeRole);
//     client.channels.cache.get('905960857601736736').send(`Welcome <@${guildMember.user.id}> to the server!`)
//     client.channels.cache.get('905960857601736736').send('https://media.discordapp.net/attachments/908229025099567146/908571572607008788/a.jpg')
// });

mongoose
    .connect(config.MONGODB_SRV, {
    })
    .then(() =>{
        console.log('Connected to the database');
    })
    .catch((err) =>{
        console.log(err);
    });