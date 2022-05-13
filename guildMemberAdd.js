const mongoose = require('mongoose');
const welcomeModel = require('../../models/welcomeModel');

module.exports = (client) => {
    const serverID = await welcomeModel.findOne({
        GuildID: member.guild.id
    });

    if (serverID) {
            
        const channelId = serverID.ChannelID;
        let welcomeRole = member.guild.roles.cache.find(role => role.name === serverID.RoleID);

        member.roles.add(welcomeRole);
        const channel = member.guild.channels.cache.get(channelId);
        channel.send(`Welcome <@${member.id}> to the server!`);
        channel.send('https://media.discordapp.net/attachments/906406839736999957/906417653344784384/BJQMzfn.png');
    }
}