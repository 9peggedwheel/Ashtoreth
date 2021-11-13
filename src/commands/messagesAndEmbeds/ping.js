const Discord = require("discord.js")

module.exports.run = async (client, message, args) => {
    message.channel.send(`${message}`);
    message.channel.send('Pong!');
}

module.exports.config = {
    name: 'ping',
    aliases: []
}