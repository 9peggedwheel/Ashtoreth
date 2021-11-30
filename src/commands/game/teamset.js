const teamModel = require('../../models/teamModel');
const profileModel = require('../../models/profileModel');
const mongoose = require('mongoose');

module.exports.run = async (client, message, args) => {
    if (!args[0]) return message.reply("Please specify team");
    if (!args[1]) return message.reply("Please specify position");
    if (!args[2]) return message.reply("Please specify character");
    if (isNaN(args[0]) || isNaN(args[1]) || isNaN(args[2])) return message.reply("Please enter a number");


    const profile = await profileModel.findOne({
        UserID: message.author.id
    });

    if (args[2] >= profile.Characters.length) return message.channel.send("Please enter someone in your inventory");

    const teamCheck = await teamModel.findOne({
        TeamLeader: message.author.id,
        TeamID: args[0]
    });
    if (!teamCheck) return message.channel.send(`You do not have a team ${args[0]}`);

    if (args[1] == 1) {
        const teamUpdate = await teamModel.findOneAndUpdate(
            {
                TeamLeader: message.author.id,
                TeamID: args[0]
            },
            {
                CardOneID: profile.Characters[args[2] - 1]
            }
        );
        message.channel.send(`A new character has been set in Team ${teamCheck.TeamName}'s front position`)
    } else if (args[1] == 2) {
        const teamUpdate = await teamModel.findOneAndUpdate(
            {
                TeamLeader: message.author.id,
                TeamID: args[0]
            },
            {
                CardTwoID: profile.Characters[args[2] - 1]
            }
        );
        message.channel.send(`A new character has been set in Team ${teamCheck.TeamName}'s middle position`)
    } else if (args[1] == 3) {
        const teamUpdate = await teamModel.findOneAndUpdate(
            {
                TeamLeader: message.author.id,
                TeamID: args[0]
            },
            {
                CardThreeID: profile.Characters[args[2] - 1]
            }
        );
        message.channel.send(`A new character has been set in Team ${teamCheck.TeamName}'s back position`)
    } else {
        return message.channel.send("Please enter a position on the team");
    }

        

}

module.exports.config = {
    name: 'teamset',
    aliases: []
}