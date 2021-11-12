const modlogModel = require('../../models/modlogModel');

module.exports.run = async (client, message, args) => {
    if (message.member.permissions.has("ADMINISTRATOR")) {
        const channel = message.mentions.channels.first();

        const data = await modlogModel.findOne({
            GuildID: message.guild.id
        });
    
        if (!data) {
            const data = new modlogModel({
                GuildID: message.guild.id,
                ChannelID: channel.id,
            });
            data.save();
            message.channel.send(`ok saved`);
        } else {
            await modlogModel.deleteOne({
                GuildID: message.guild.id,
            });
    
            const data = new modlogModel({
                GuildID: message.guild.id,
                ChannelID: channel.id,
            });
            data.save();
            message.channel.send(`ok saved`);
        }
    } else {
        message.channel.send("You don't have the permission to set channels");
    }

}

module.exports.config = {
    name: 'setmodlog',
    aliases: []
}