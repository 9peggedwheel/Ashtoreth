const welcomeModel = require('../../models/welcomeModel');

module.exports.run = async (client, message, args) => {
    if (message.member.permissions.has("ADMINISTRATOR")) {
        const channel = message.mentions.channels.first();
        const role = message.mentions.roles.first();

        const data = await welcomeModel.findOne({
            GuildID: message.guild.id
        });
    
        if (!data) {
            const data = new welcomeModel({
                GuildID: message.guild.id,
                ChannelID: channel.id,
                RoleID: role.id
            });
            data.save();
            message.channel.send(`ok saved`);
        } else {
            await welcomeModel.deleteOne({
                GuildID: message.guild.id,
            });
    
            const data = new welcomeModel({
                GuildID: message.guild.id,
                ChannelID: channel.id,
                RoleID: role.id
            });
            data.save();
            message.channel.send(`ok saved`);
        }
    } else {
        message.channel.send("You don't have the permission to set channels");
    }

}

module.exports.config = {
    name: 'setwelcome',
    aliases: []
}