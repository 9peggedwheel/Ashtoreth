const profileModel = require('../../models/profileModel');
const characterdata = require('../../../characterdata.json');
const Discord = require("discord.js")

module.exports.run = async (client, message, args) => {
    const member = message.author.id;

    const profile = await profileModel.findOne({
        UserID: member
    });

    if (!profile) {
        message.channel.send(`You need to create a profile first.`);
        return;
    }
    let AstralCoins = profile.AstralCoins;

    
    if (AstralCoins < 30) {
        message.channel.send(`You don't have enough Astral Coins to summon`);
        return;
    }
    
    for (let i = 0; i < 11; i++) {
        let randomNumber = Math.floor(Math.random()*100) + 1;
        if (randomNumber == 25) {
            let randomIndex = Math.floor(Math.random()*(characterdata.FIVESTARCHARS));
            let character = characterdata.FIVESTARCHAR[randomIndex];
            message.channel.send(`__**You just summoned a five star!**__`);
            message.channel.send(`${character}!`);
            const profile2 = await profileModel.findOneAndUpdate(
                { UserID: member },
                { $inc: { AstralCoins: -3}, $addToSet: { Characters: `${character }` }}, {upsert: true}
            );
        } else if (randomNumber == 1 || randomNumber == 2 || randomNumber == 3 || randomNumber == 4 || randomNumber == 5) {
            let randomIndex = Math.floor(Math.random()*((characterdata.FOURSTARCHAR).length));
            let character = characterdata.FOURSTARCHAR[randomIndex];
            message.channel.send(`**You just summoned a four star!**`);
            message.channel.send(`${character}!`);
            const profile2 = await profileModel.findOneAndUpdate(
                { UserID: member },
                { $inc: { AstralCoins: -3}, $addToSet: { Characters: `${character }` }}, {upsert: true}
            );
        } else {
            let randomIndex = Math.floor(Math.random()*((characterdata.THREESTARCHAR).length));
            let character = characterdata.THREESTARCHAR[randomIndex];
            message.channel.send(`You summoned a three star`);
            message.channel.send(`${character}!`);
            const profile2 = await profileModel.findOneAndUpdate(
                { UserID: member },
                { $inc: { AstralCoins: -3}, $addToSet: { Characters: `${character }` }}, {upsert: true}
            );
        }
    }

}

module.exports.config = {
    name: 'multisummon',
    aliases: ['msummon']
}