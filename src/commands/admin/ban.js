const Discord = require("discord.js")

module.exports.run = async (client, message, args) => {
    if (message.member.permissions.has("BAN_MEMBERS")) {
        const member = message.mentions.users.first();
        if (member) {
            const memberTarget = message.guild.members.cache.get(member.id);
            if (member.id === '905616259645845604') return message.reply("Nice try buddy");
            if (message.member.roles.highest.comparePositionTo(member.roles.highest) > 0){
                memberTarget.ban().catch(error => {
                    message.channel.send("Calm down buddy");
                    return;
                });
                message.channel.send(`<@${memberTarget.user.id}> has been banned`);
            } else {
                message.channel.send("Calm down buddy");
                return;
            }
        } else {
            message.channel.send("Invalid member");
        }
    } else {
        message.channel.send("You don't have the permission to ban members");
    }
}

module.exports.config = {
    name: 'ban',
    aliases: []
}