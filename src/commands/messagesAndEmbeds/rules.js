const { MessageEmbed } = require('discord.js');
const Discord = require("discord.js")

module.exports.run = async (client, message, args) => {
    const newEmbed = new MessageEmbed()
        .setColor('#EDF1FF')
        .setImage("https://i.imgur.com/qVpneTg.png");

    message.channel.send({ embeds: [newEmbed] });

    const newEmbed2 = new MessageEmbed()
        .setColor('#EDF1FF')
        .setTitle('Rules')
        // .setURL('https://google.com')
        // .setDescription("This is an embed")
        .addFields(
            {name: 'Chatting Rules', value: '- No excessive spam (this includes texts, images, and videos)\n- No explicit content\n- No advertisement\n- Keep things in the correct channel as much as possible'},
            {name: 'Other Rules', value: '- No extreme forms of harassment\n- No excessive opinion shaming\n- Follow discord TOS and guildlines'},
        );
        // .setImage("https://media.discordapp.net/attachments/905711733019136052/906333248794288139/BJQMzfn.png")
        // .setFooter("Check Rules");

    message.channel.send({ embeds: [newEmbed2] });

}

module.exports.config = {
    name: 'rules',
    aliases: []
}