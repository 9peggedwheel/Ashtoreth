const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    TeamLeader: String,
    TeamID: Number,
    TeamName: String,
    CardOneID: Number,
    CardTwoID: Number,
    CardThreeID: Number
});

const model = mongoose.model('teamModel', teamSchema);

module.exports = model;