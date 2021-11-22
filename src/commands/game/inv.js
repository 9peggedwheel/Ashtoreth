const profileModel = require('../../models/profileModel');
const { MessageEmbed } = require('discord.js');
const characterModel = require('../../models/characterModel');
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
    let EssencePoints = profile.EssencePoints;
    let Inventory = profile.Characters;
    let invString = "";
    for (let i = 0; i < Inventory.length - 1; i++) {
        const character = await characterModel.findOne({
            CharacterID: Inventory[i]
        });
        invString += character.CharacterName;
        if (i != Inventory.length - 1) {
            invString += ", ";
        }
    }
    const newEmbed = new MessageEmbed()
        .setColor('#EDF1FF')
        .setTitle(`${message.author.username}'s profile`)
        .setDescription('' + invString)
        .addFields(
            {name: 'Astral Coins', value: "" + AstralCoins},
            {name: 'Essence Points', value: "" + EssencePoints},
        );
        // .setDescription("Join the support server (Link in ABOUT ME)")
        // .setURL('https://google.com')
        // .setImage("https://media.discordapp.net/attachments/905711733019136052/906339115442790440/6y6UOuA.png");
    message.channel.send({ embeds: [newEmbed] });

}

module.exports.config = {
    name: 'inv',
    aliases: ['inventory']
}