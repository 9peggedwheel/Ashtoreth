const ms = require('ms');

const Discord = require("discord.js")

module.exports.run = async (client, message, args) => {
    const member = message.mentions.users.first();
    if (member) {
        let mainRole = message.guild.roles.cache.find(role => role.name === 'Member');
        let muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');

        let memberTarget = message.guild.members.cache.get(member.id);
        
        if (member.id === '905616259645845604') return message.reply("Nice try buddy");
        if (!args[1]) {
            memberTarget.roles.remove(mainRole.id);
            memberTarget.roles.add(muteRole.id);
            message.channel.send(`<@${memberTarget.user.id}> has been muted`);
            return;
        }

        memberTarget.roles.remove(mainRole.id);
        memberTarget.roles.add(muteRole.id);
        message.channel.send(`<@${memberTarget.user.id}> has been muted for ${ms(ms(args[1]))}`);

        setTimeout(function() {
            memberTarget.roles.remove(muteRole.id);
            memberTarget.roles.add(mainRole.id);
        }, ms(args[1]));
    } else {
        message.channel.send("Invalid member");
    }
}

module.exports.config = {
    name: 'mute',
    aliases: []
}