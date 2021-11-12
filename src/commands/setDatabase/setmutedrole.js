const muteModel = require('../../models/muteModel');

module.exports.run = async (client, message, args) => {
    if (message.member.permissions.has("ADMINISTRATOR")) {
        const role = message.mentions.roles.first();

        const data = await muteModel.findOne({
            GuildID: message.guild.id
        });
    
        if (!data) {
            const data = new muteModel({
                GuildID: message.guild.id,
                RoleID: role.id
            });
            data.save();
            message.channel.send(`ok saved`);
        } else {
            await muteModel.deleteOne({
                GuildID: message.guild.id,
            });
    
            const data = new muteModel({
                GuildID: message.guild.id,
                RoleID: role.id
            });
            data.save();
            message.channel.send(`ok saved`);
        }
    } else {
        message.channel.send("You don't have the permission to set muted role");
    }

}

module.exports.config = {
    name: 'setmutedrole',
    aliases: []
}