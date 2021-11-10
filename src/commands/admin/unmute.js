// module.exports = {
//     name: 'unmute',
//     description: "unmute member",
//     execute(message, args) {
//         const member = message.mentions.users.first();
//         if (member) {
//             let mainRole = message.guild.roles.cache.find(role => role.name === 'Muted');
//             let muteRole = message.guild.roles.cache.find(role => role.name === 'Member');

//             let memberTarget = message.guild.members.cache.get(member.id);

//             memberTarget.roles.remove(mainRole.id);
//             memberTarget.roles.add(muteRole.id);
//             message.channel.send(`<@${memberTarget.user.id}> has been unmuted`);
//         } else {
//             message.channel.send("Invalid member");
//         }
//     }
// }

const Discord = require("discord.js")

module.exports.run = async (client, message, args) => {
    const member = message.mentions.users.first();
    if (member) {
        let mainRole = message.guild.roles.cache.find(role => role.name === 'Muted');
        let muteRole = message.guild.roles.cache.find(role => role.name === 'Member');

        let memberTarget = message.guild.members.cache.get(member.id);

        memberTarget.roles.remove(mainRole.id);
        memberTarget.roles.add(muteRole.id);
        message.channel.send(`<@${memberTarget.user.id}> has been unmuted`);
    } else {
        message.channel.send("Invalid member");
    }
}

module.exports.config = {
    name: 'unmute',
    aliases = []
}