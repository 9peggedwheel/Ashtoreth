const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
    CardName: String,
    CardImage: String
});

const model = mongoose.model('cardModel', cardSchema);

module.exports = model;