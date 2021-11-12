const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    UserID: String,
    AstralCoins: Number,
    EssencePoints: Number,
    Characters: [String],
    Inventory: [String]
});

const model = mongoose.model('profileModel', profileSchema);

module.exports = model;