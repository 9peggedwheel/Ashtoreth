const profileModel = require('../../models/profileModel');
const { MessageEmbed } = require('discord.js');
const characterModel = require('../../models/characterModel');
const Discord = require("discord.js")

module.exports.run = async (client, message, args) => {
    const member = message.author.id;
    const invNumber = args[0];
    const profile = await profileModel.findOne({
        UserID: member
    });

    if (!profile) {
        message.channel.send(`You need to create a profile first.`);
        return;
    }

    let Inventory = profile.Characters;
    if (args[0] > Inventory.length || args[0] < 1) return message.channel.send("Invalid index");

    const character = await characterModel.findOne({
        CharacterID: Inventory[invNumber - 1]
    })
    const newEmbed = new MessageEmbed()
        .setColor('#EDF1FF')
        .setTitle(`${message.author.username}'s ${character.CharacterName}`)
        // .setDescription('' + invString)
        .addFields(
            {name: 'Stars', value: `${character.Stars}`},
            {name: 'Constellation', value: `${character.Constellation}`},
            {name: 'Level', value: `${character.Level}`},
            {name: 'Stats', value: `Health: ${character.Health}\nAttack: ${character.Attack}\nDefense: ${character.Defense}\nSpeed: ${character.Speed}`},
            {name: 'Ability', value: `${character.Ability}`},
        )
        .setImage(`${character.CardImage}`);
        // .setDescription("Join the support server (Link in ABOUT ME)")
        // .setURL('https://google.com')
        // .setImage("https://media.discordapp.net/attachments/905711733019136052/906339115442790440/6y6UOuA.png");
    message.channel.send({ embeds: [newEmbed] });

}

module.exports.config = {
    name: 'view',
    aliases: []
}