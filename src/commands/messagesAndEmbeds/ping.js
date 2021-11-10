// module.exports = {
//     name: 'ping',
//     description: "this is a ping command",
//     execute(message, args) {
//         message.channel.send('Pong!');
//     }
// }


const Discord = require("discord.js")

module.exports.run = async (client, message, args) => {
    message.channel.send('Pong!');
}

module.exports.config = {
    name: 'ping',
    aliases = []
}