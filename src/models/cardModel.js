const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
    CardName: String,
    CharacterName: String,
    Stars: Number,
    Constellation: Number,
    Level: Number,
    Health: Number,
    Attack: Number,
    Defense: Number,
    Speed: Number,
    AbilityID: Number,
    Ability: String,
    CardImage: String
});

const model = mongoose.model('cardModel', cardSchema);

module.exports = model;