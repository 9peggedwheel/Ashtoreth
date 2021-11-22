const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    UserID: String,
    Level: Number,
    CurrentExp: Number,
    NeededExp: Number,
    Chapter: Number,
    AstralCoins: Number,
    EssencePoints: Number,
    Characters: [],
    Inventory: []
});

const model = mongoose.model('profileModel', profileSchema);

module.exports = model;