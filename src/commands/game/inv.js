const profileSchema = require('../../models/profileSchema');
const { MessageEmbed } = require('discord.js');
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
    let EssencePoints = profile.EssencePoints;
    const newEmbed = new MessageEmbed()
        .setColor('#EDF1FF')
        .setTitle(`<@${member.id}>'s profile`)
        .addFields(
            {name: 'Astral Coins', value: AstralCoins},
            {name: 'Essence Points', value: EssencePoints},
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