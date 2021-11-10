// module.exports = {
//     name: 'kick',
//     description: "kick member",
//     execute(message, args) {
//         if (message.member.permissions.has("KICK_MEMBERS")) {
//             const member = message.mentions.users.first();
//             if (member) {
//                 const memberTarget = message.guild.members.cache.get(member.id);
//                 message.channel.send(`<@${memberTarget.user.id}> has been kicked`);
//                 memberTarget.kick();
//             } else {
//                 message.channel.send("Invalid member");
//             }
//         } else {
//             message.channel.send("You don't have the permission to kick members");
//         }
//     }
// }

const Discord = require("discord.js")

module.exports.run = async (client, message, args) => {
    if (message.member.permissions.has("KICK_MEMBERS")) {
        const member = message.mentions.users.first();
        if (member) {
            const memberTarget = message.guild.members.cache.get(member.id);
            message.channel.send(`<@${memberTarget.user.id}> has been kicked`);
            memberTarget.kick();
        } else {
            message.channel.send("Invalid member");
        }
    } else {
        message.channel.send("You don't have the permission to kick members");
    }
}

module.exports.config = {
    name: 'kick',
    aliases: []
}