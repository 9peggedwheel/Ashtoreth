const profileSchema = require('../../models/profileSchema');
const characterdata = require('../../../characterdata.json');
const Discord = require("discord.js")

module.exports.run = async (client, message, args) => {
    const member = message.author.id;

    const profile = await profileSchema.findOne({
        UserID: member
    });

    if (!profile) {
        message.channel.send(`You need to create a profile first.`);
        return;
    }
    let AstralCoins = profile.AstralCoins;
    let Inventory = profile.Inventory;

    
    if (AstralCoins < 3) {
        message.channel.send(`You don't have enough Astral Coins to summon`);
        return;
    } else {
        profile.update({$inc: {AstralCoins: -3}});
    }
    
    const randomNumber = Math.floor(Math.random*100) + 1;
    if (randomNumber == 25) {
        const randomIndex = Math.floor(Math.random*(characterdata.FIVESTARCHARS) + 1);
        const character = characterdata.FIVESTARCHAR[randomIndex];
        message.channel.send(`You just summoned ${character}!`);
        profile.update({$push: {Inventory: character}});
    } else if (randomNumber == 1 || randomNumber == 2 || randomNumber == 3) {
        const randomIndex = Math.floor(Math.random*((characterdata.FOURSTARCHAR).length) + 1);
        const character = characterdata.FOURSTARCHAR[randomIndex];
        message.channel.send(`You just summoned ${character}!`);
        profile.update({$push: {Inventory: character}});
    } else {
        message.channel.send(`feels bad`);
    }

}

module.exports.config = {
    name: 'summon',
    aliases: []
}