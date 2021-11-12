const cardModel = require('../../models/cardModel');

module.exports.run = async (client, message, args) => {
    const card = await cardModel.findOne({
        CardName: args[0]
    });
    let cardImage = card.CardImage;

    if (!card) {
        message.channel.send(`There is no card by that name!`);
        return;
    } else {
        message.channel.send(`${cardImage}`);
    }

}

module.exports.config = {
    name: 'characterinfo',
    aliases: ['chinfo']
}