const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
    UserID: String,
    CardID: String,
    CardName: String,
    CardImage: String,
    Level: Number,
    Constellation: Number
});

const model = mongoose.model('cardModel', cardSchema);

module.exports = model;