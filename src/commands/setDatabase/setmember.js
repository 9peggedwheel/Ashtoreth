const memberModel = require('../../models/memberModel');

module.exports.run = async (client, message, args) => {
    if (message.member.permissions.has("ADMINISTRATOR")) {
        const role = message.mentions.roles.first();

        const data = await memberModel.findOne({
            GuildID: message.guild.id
        });
    
        if (!data) {
            const data = new memberModel({
                GuildID: message.guild.id,
                RoleID: role.id
            });
            data.save();
            message.channel.send(`ok saved`);
        } else {
            await memberModel.deleteOne({
                GuildID: message.guild.id,
            });
    
            const data = new memberModel({
                GuildID: message.guild.id,
                RoleID: role.id
            });
            data.save();
            message.channel.send(`ok saved`);
        }
    } else {
        message.channel.send("You don't have the permission to set member role");
    }

}

module.exports.config = {
    name: 'setmember',
    aliases: []
}