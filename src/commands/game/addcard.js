const cardModel = require('../../models/cardModel');
const mongoose = require('mongoose');

module.exports.run = async (client, message, args) => {
    if (message.author.id == "388931842415263744" || message.author.id == "810701832255045633") {
        const card = await cardModel.findOne({
            CardName: args[0]
        });

        if (!card) {
            const database = mongoose.connection.db.collection('cardmodels');
            const count = await database.countDocuments();
            const card = new cardModel({
                CardName: args[0],
                CharacterName: args[0],
                Level: 1,
                Attack: 100,
                Defense: 100,
                Health: 100,
                Speed: 100,
                AbilityID: count + 1,
                Ability: "N/A",
                CardImage: args[1]
            });
            card.save();
            message.channel.send(`A new character has been added!`);
        } else {
            message.channel.send(`There is already an existing character!`);
        }
    } else {
        return;
    }

}

module.exports.config = {
    name: 'addcard',
    aliases: []
}