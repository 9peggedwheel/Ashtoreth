const Discord = require("discord.js")

module.exports.run = async (client, message, args) => {
    if (message.member.permissions.has("BAN_MEMBERS")) {
        const member = message.mentions.users.first();
        if (member) {
            const memberTarget = message.guild.members.cache.get(member.id);
            message.channel.send(`<@${memberTarget.user.id}> has been banned`);
            memberTarget.ban();
        } else {
            message.channel.send("Invalid member");
        }
    } else {
        message.channel.send("You don't have the permission to ban members");
    }
}

module.exports.config = {
    name: 'ban'
}