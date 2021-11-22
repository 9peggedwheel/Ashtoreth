const profileModel = require('../../models/profileModel');
const cardModel = require('../../models/cardModel');
const characterModel = require('../../models/characterModel');
const characterdata = require('../../../characterdata.json');
const mongoose = require('mongoose');
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
        const randomIndex = Math.floor(Math.random()*((characterdata.FIVESTARCHAR).length));
        const character = characterdata.FIVESTARCHAR[randomIndex];
        message.channel.send(`__**You just summoned a five star!**__\n${character}!`);
        const database = mongoose.connection.db.collection('charactermodels');
        const count = await database.countDocuments();
        const card = await cardModel.findOne({
            CharacterName: character
        });

        const character = new characterModel({
            CharacterID: count + 1,
            CardOwner: member,
            CardName: card.CardName,
            CharacterName: card.CharacterName,
            Stars: card.Stars,
            Constellation: card.Constellation,
            Level: card.Level,
            Health: card.Health,
            Attack: card.Attack,
            Defense: card.Defense,
            Speed: card.Speed,
            AbilityID: card.AbilityID,
            Ability: card.Ability,
            CardImage: card.CardImage
        });
        const profile2 = await profileModel.findOneAndUpdate(
            { UserID: member },
            { $inc: { AstralCoins: -3}, $addToSet: { Characters: `${character.CharacterID}` }}, {upsert: true}
        );
    } else if (randomNumber == 1 || randomNumber == 2 || randomNumber == 3 || randomNumber == 4 || randomNumber == 5) {
        const randomIndex = Math.floor(Math.random()*((characterdata.FOURSTARCHAR).length));
        const character = characterdata.FOURSTARCHAR[randomIndex];
        message.channel.send(`**You just summoned a four star!**\n${character}!`);
        const database = mongoose.connection.db.collection('charactermodels');
        const count = await database.countDocuments();
        const card = await cardModel.findOne({
            CharacterName: character
        });

        const character = new characterModel({
            CharacterID: count + 1,
            CardOwner: member,
            CardName: card.CardName,
            CharacterName: card.CharacterName,
            Stars: card.Stars,
            Constellation: card.Constellation,
            Level: card.Level,
            Health: card.Health,
            Attack: card.Attack,
            Defense: card.Defense,
            Speed: card.Speed,
            AbilityID: card.AbilityID,
            Ability: card.Ability,
            CardImage: card.CardImage
        });
        const profile2 = await profileModel.findOneAndUpdate(
            { UserID: member },
            { $inc: { AstralCoins: -3}, $addToSet: { Characters: `${character.CharacterID}` }}, {upsert: true}
        );
    } else {
        const randomIndex = Math.floor(Math.random()*((characterdata.THREESTARCHAR).length));
        const character = characterdata.THREESTARCHAR[randomIndex];
        message.channel.send(`You summoned a three star\n${character}!`);
        const database = mongoose.connection.db.collection('charactermodels');
        const count = await database.countDocuments();
        const card = await cardModel.findOne({
            CharacterName: character
        });

        const character = new characterModel({
            CharacterID: count + 1,
            CardOwner: member,
            CardName: card.CardName,
            CharacterName: card.CharacterName,
            Stars: card.Stars,
            Constellation: card.Constellation,
            Level: card.Level,
            Health: card.Health,
            Attack: card.Attack,
            Defense: card.Defense,
            Speed: card.Speed,
            AbilityID: card.AbilityID,
            Ability: card.Ability,
            CardImage: card.CardImage
        });
        const profile2 = await profileModel.findOneAndUpdate(
            { UserID: member },
            { $inc: { AstralCoins: -3}, $addToSet: { Characters: `${character.CharacterID}` }}, {upsert: true}
        );
    }

}

module.exports.config = {
    name: 'summon',
    aliases: []
}