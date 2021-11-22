const profileModel = require('../../models/profileModel');

module.exports.run = async (client, message, args) => {
    const member = message.author.id;

    const profile = await profileModel.findOne({
        UserID: member
    });

    if (!profile) {
        const profile = new profileModel({
            UserID: member,
            Level: 1,
            CurrentExp: 0,
            NeededExp: 100,
            Chapter: 0,
            AstralCoins: 30,
            EssencePoints: 0,
            Characters: [],
            Inventory: []
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