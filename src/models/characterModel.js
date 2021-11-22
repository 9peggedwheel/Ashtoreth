const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema({
    CharacterID: Number,
    CardOwner: String,
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

const model = mongoose.model('characterModel', characterSchema);

module.exports = model;