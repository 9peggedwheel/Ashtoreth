const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    UserID: String,
    AstralCoins: Number,
    EssencePoints: Number
});

const model = mongoose.model('profileModel', profileSchema);

module.exports = model;