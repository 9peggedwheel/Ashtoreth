const Discord = require("discord.js")
const muteModel = require('../../models/muteModel');
const memberModel = require('../../models/memberModel');

module.exports.run = async (client, message, args) => {
    const member = message.mentions.users.first();
    if (member) {
        const data = await muteModel.findOne({
            GuildID: message.guild.id
        });
        if (!data) return;
        let muteRole = message.guild.roles.cache.get(data.RoleID);

        const data2 = await memberModel.findOne({
            GuildID: message.guild.id
        });
        if (!data2) return;
        let memberRole = message.guild.roles.cache.get(data2.RoleID);


        let memberTarget = message.guild.members.cache.get(member.id);

        memberTarget.roles.remove(muteRole);
        memberTarget.roles.add(memberRole);
        message.channel.send(`<@${memberTarget.user.id}> has been unmuted`);
    } else {
        message.channel.send("Invalid member");
    }
}

module.exports.config = {
    name: 'unmute',
    aliases: []
}