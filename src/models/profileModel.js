const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    UserID: String,
    AstralCoins: Number,
    EssencePoints: Number,
    Inventory: [String]
});

const model = mongoose.model('profileModel', profileSchema);

module.exports = model;