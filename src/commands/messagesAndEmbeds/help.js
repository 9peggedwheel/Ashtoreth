const { MessageEmbed } = require('discord.js');
const Discord = require("discord.js")

module.exports.run = async (client, message, args) => {
    const newEmbed = new MessageEmbed()
        .setColor('#EDF1FF')
        .setTitle("Need Help?")
        .setDescription("Join the support server (Link in ABOUT ME)")
        .setURL('https://docs.google.com/document/d/1vFNvKsYxIyd4_pMb7pNX_ZbOKnd118U6iqv00ncQ4_s/edit')
        // .setImage("https://media.discordapp.net/attachments/905711733019136052/906339115442790440/6y6UOuA.png");

    message.channel.send({ embeds: [newEmbed] });
}

module.exports.config = {
    name: 'help',
    aliases: []
}