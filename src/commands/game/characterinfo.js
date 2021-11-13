const cardModel = require('../../models/cardModel');
const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {
    let tmp = message.content.slice(15);
    tmp = tmp.replace(/\s+/g, '');
    const command = tmp.toLowerCase();

    const card = await cardModel.findOne({
        CardName: command
    });


    if (!card) {
        message.channel.send(`There is no character by that name!`);
        return;
    } else {
        let cardImage = card.CardImage;
        let name = card.CharacterName;
        let stars = card.Stars;
        let constellation = card.Constellation;
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
                {name: 'Constellation', value: `${constellation}`},
                {name: 'Level', value: `${level}`},
                {name: 'Health', value: `${health}`},
                {name: 'Attack', value: `${attack}`},
                {name: 'Defense', value: `${defense}`},
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