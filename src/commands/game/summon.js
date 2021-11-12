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

    
    if (AstralCoins < 3) {
        message.channel.send(`You don't have enough Astral Coins to summon`);
        return;
    }
    
    const randomNumber = Math.floor(Math.random()*100) + 1;
    if (randomNumber == 25) {
        const randomIndex = Math.floor(Math.random()*(characterdata.FIVESTARCHARS));
        const character = characterdata.FIVESTARCHAR[randomIndex];
        message.channel.send(`__**You just summoned a five star!**__`);
        message.channel.send(`${character}!`);
        const profile2 = await profileModel.findOneAndUpdate(
            { UserID: member },
            { $inc: { AstralCoins: -3}, $addToSet: { Inventory: `${character }` }}, {upsert: true}
        );
    } else if (randomNumber == 1 || randomNumber == 2 || randomNumber == 3) {
        const randomIndex = Math.floor(Math.random()*((characterdata.FOURSTARCHAR).length));
        const character = characterdata.FOURSTARCHAR[randomIndex];
        message.channel.send(`**You just summoned a four star!**`);
        message.channel.send(`${character}!`);
        const profile2 = await profileModel.findOneAndUpdate(
            { UserID: member },
            { $inc: { AstralCoins: -3}, $addToSet: { Inventory: `${character }` }}, {upsert: true}
        );
    } else {
        message.channel.send(`feels bad`);
    }

}

module.exports.config = {
    name: 'summon',
    aliases: []
}