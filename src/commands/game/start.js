const profileSchema = require('../../models/profileSchema');

module.exports.run = async (client, message, args) => {
    const member = message.author.id;

    const profile = await profileSchema.findOne({
        UserID: member
    });

    if (!profile) {
        const profile = new profileSchema({
            UserID: member,
            AstralCoins: 3,
            EssencePoints: 0
        });
        profile.save();
        message.channel.send(`A new profile has been created!`);
    } else {
        message.channel.send(`There is already an existing profile!`);
    }

}

module.exports.config = {
    name: 'start',
    aliases: []
}