const { MessageEmbed } = require('discord.js');
const Discord = require("discord.js")

module.exports.run = async (client, message, args) => {
    const newEmbed = new MessageEmbed()
        .setColor('#EDF1FF')
        .setImage("https://media.discordapp.net/attachments/905711733019136052/906339115442790440/6y6UOuA.png");

    message.channel.send({ embeds: [newEmbed] });

    const newEmbed2 = new MessageEmbed()
        .setColor('#EDF1FF')
        .setTitle('General Information')
        // .setURL('https://google.com')
        // .setDescription("This is an embed")
        .addFields(
            {name: 'Server Info', value: 'Server is botted by Ashtoreth! For help or questions regarding the bot,\nplease visit the support server!'},
            {name: 'Ashtoreth Support Server', value: 'https://discord.gg/wGQ2EcX3Wy'},
        );
        // .setImage("https://media.discordapp.net/attachments/905711733019136052/906333248794288139/BJQMzfn.png")
        // .setFooter("Check Rules");

    message.channel.send({ embeds: [newEmbed2] });
}

module.exports.config = {
    name: 'info',
    aliases: []
}