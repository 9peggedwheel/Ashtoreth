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

mongoose
    .connect(config.MONGODB_SRV, {
    })
    .then(() =>{
        console.log('Connected to the database');
    })
    .catch((err) =>{
        console.log(err);
    });