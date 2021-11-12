const cardModel = require('../../models/cardModel');

module.exports.run = async (client, message, args) => {
    const card = await cardModel.findOne({
        CardName: args[0]
    });


    if (!card) {
        message.channel.send(`There is no character by that name!`);
        return;
    } else {
        let cardImage = card.CardImage;
        message.channel.send(`${cardImage}`);
    }

}

module.exports.config = {
    name: 'characterinfo',
    aliases: ['chinfo']
}