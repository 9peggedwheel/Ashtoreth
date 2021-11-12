const cardModel = require('../../models/cardModel');

module.exports.run = async (client, message, args) => {
    if (message.author.id == "388931842415263744" || message.author.id == "810701832255045633") {
        const card = await cardModel.findOne({
            CardName: args[0]
        });

        if (!card) {
            const card = new cardModel({
                CardName: args[0],
                CardImage: args[1]
            });
            card.save();
            message.channel.send(`A new card has been added!`);
        } else {
            message.channel.send(`There is already an existing card!`);
        }
    } else {
        return;
    }

}

module.exports.config = {
    name: 'addcard',
    aliases: []
}