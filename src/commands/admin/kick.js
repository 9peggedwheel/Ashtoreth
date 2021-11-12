const Discord = require("discord.js")

module.exports.run = async (client, message, args) => {
    if (message.member.permissions.has("KICK_MEMBERS")) {
        const member = message.mentions.users.first();
        if (member) {
            const memberTarget = message.guild.members.cache.get(member.id);
            if (member.id === '905616259645845604') return message.reply("Nice try buddy");
            try {
                memberTarget.kick();
            } catch (error) {
                return message.channel.send("Calm down buddy");
            }
            message.channel.send(`<@${memberTarget.user.id}> has been kicked`);

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