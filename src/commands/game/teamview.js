const teamModel = require('../../models/teamModel');
const profileModel = require('../../models/profileModel');
const mongoose = require('mongoose');

module.exports.run = async (client, message, args) => {
    if (!args[0]) return message.reply("Please specify team");
    if (isNaN(args[0])) return message.reply("Please enter a number");


    const teamCheck = await teamModel.findOne({
        TeamLeader: message.author.id,
        TeamID: args[0]
    });
    if (!teamCheck) return message.channel.send(`You do not have a team ${teamCheck.TeamID}`);
        

}

module.exports.config = {
    name: 'teamview',
    aliases: []
}