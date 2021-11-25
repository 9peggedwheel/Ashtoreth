const teamModel = require('../../models/teamModel');
const mongoose = require('mongoose');

module.exports.run = async (client, message, args) => {
    const database = mongoose.connection.db.collection('teammodels');
    const count = await database.countDocuments({
        TeamLeader: message.author.id
    });
    if (count >= 5) return message.channel.send("You have too many teams!");

    let tmp = message.content.slice(9);
    const teamCheck = await teamModel.findOne({
        TeamLeader: message.author.id,
        TeamName: tmp
    });
    if (teamCheck) return message.channel.send("There already exists a team with that name!");


    const team = new teamModel({
        TeamLeader: message.author.id,
        TeamID: count + 1,
        TeamName: tmp,
        CardOneID: 0,
        CardTwoID: 0,
        CardThreeID: 0
    });
    team.save();
    message.channel.send(`A new team has been created!`);

        

}

module.exports.config = {
    name: 'newteam',
    aliases: []
}