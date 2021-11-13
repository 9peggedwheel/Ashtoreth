const cardModel = require('../../models/cardModel');
const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {
    const card = await cardModel.findOne({
        CardName: args[0]
    });


    if (!card) {
        message.channel.send(`There is no character by that name!`);
        return;
    } else {
        let cardImage = card.CardImage;
        let name = card.CharacterName;
        let stars = card.Stars;
        let level = card.Level;
        let attack = card.Attack;
        let health = card.Health;
        let defense = card.Defense;
        let speed = card.Speed;
        let ability = card.Ability;
        const newEmbed = new MessageEmbed()
            .setColor('#EDF1FF')
            .setTitle(`${name}`).addFields(
                {name: 'Stars', value: `${stars}`},
                {name: 'Level', value: `${level}`},
                {name: 'Attack', value: `${attack}`},
                {name: 'Defense', value: `${defense}`},
                {name: 'Health', value: `${health}`},
                {name: 'Speed', value: `${speed}`},
                {name: 'Ability', value: `${ability}`},
            )
            .setImage(`${cardImage}`);

        message.channel.send({ embeds: [newEmbed] });
    }

}

module.exports.config = {
    name: 'characterinfo',
    aliases: ['chinfo']
}