const teamModel = require('../../models/teamModel');
const { MessageEmbed } = require('discord.js');
const characterModel = require('../../models/characterModel');
const mongoose = require('mongoose');

module.exports.run = async (client, message, args) => {
    if (!args[0]) return message.reply("Please specify team");
    if (isNaN(args[0])) return message.reply("Please enter a number");


    const teamCheck = await teamModel.findOne({
        TeamLeader: message.author.id,
        TeamID: args[0]
    });
    if (!teamCheck) return message.channel.send(`You do not have a team ${teamCheck.TeamID}`);
    if (teamCheck.CardOneID != 0) {
        const CardOne = await characterModel.findOne({
            CharacterID: teamCheck.CardOneID
        });
        if (teamCheck.CardTwoID != 0) {
            const CardTwo = await characterModel.findOne({
                CharacterID: teamCheck.CardTwoID
            });
            if (teamCheck.CardThreeID != 0) {
                const CardThree = await characterModel.findOne({
                    CharacterID: teamCheck.CardThreeID
                });
                const newEmbed = new MessageEmbed()
                .setColor('#EDF1FF')
                .addFields(
                    {name: 'Front', value: `${CardOne.CardName}`},
                    {name: 'Middle', value: `${CardTwo.CardName}`},
                    {name: 'Back', value: `${CardThree.CardName}`},
                );
            
                message.channel.send({ embeds: [newEmbed] });
            }
            else {
                const newEmbed = new MessageEmbed()
                .setColor('#EDF1FF')
                .addFields(
                    {name: 'Front', value: `${CardOne.CardName}`},
                    {name: 'Middle', value: `${CardTwo.CardName}`},
                    {name: 'Back', value: `Empty`},
                );
            
                message.channel.send({ embeds: [newEmbed] });
            }
        }
        else if (teamCheck.CardThreeID != 0) {
            const CardThree = await characterModel.findOne({
                CharacterID: teamCheck.CardThreeID
            });
            const newEmbed = new MessageEmbed()
            .setColor('#EDF1FF')
            .addFields(
                {name: 'Front', value: `${CardOne.CardName}`},
                {name: 'Middle', value: `Empty`},
                {name: 'Back', value: `${CardThree.CardName}`},
            );
        
            message.channel.send({ embeds: [newEmbed] });
        }
        else {
            const newEmbed = new MessageEmbed()
            .setColor('#EDF1FF')
            .addFields(
                {name: 'Front', value: `${CardOne.CardName}`},
                {name: 'Middle', value: `Empty`},
                {name: 'Back', value: `Empty`},
            );
            message.channel.send({ embeds: [newEmbed] });
        }
    }
    else if (teamCheck.CardTwoID != 0) {
        const CardTwo = await characterModel.findOne({
            CharacterID: teamCheck.CardTwoID
        });
        if (teamCheck.CardThreeID != 0) {
            const CardThree = await characterModel.findOne({
                CharacterID: teamCheck.CardThreeID
            });
            const newEmbed = new MessageEmbed()
            .setColor('#EDF1FF')
            .addFields(
                {name: 'Front', value: `Empty`},
                {name: 'Middle', value: `${CardTwo.CardName}`},
                {name: 'Back', value: `${CardThree.CardName}`},
            );
        
            message.channel.send({ embeds: [newEmbed] });
        }
        else {
            const newEmbed = new MessageEmbed()
            .setColor('#EDF1FF')
            .addFields(
                {name: 'Front', value: `Empty`},
                {name: 'Middle', value: `${CardTwo.CardName}`},
                {name: 'Back', value: `Empty`},
            );
            message.channel.send({ embeds: [newEmbed] });
        }
    }
    else if (teamCheck.CardThreeID != 0) {
        const CardThree = await characterModel.findOne({
            CharacterID: teamCheck.CardThreeID
        });
        const newEmbed = new MessageEmbed()
        .setColor('#EDF1FF')
        .addFields(
            {name: 'Front', value: `Empty`},
            {name: 'Middle', value: `Empty`},
            {name: 'Back', value: `${CardThree.CardName}`},
        );
    
        message.channel.send({ embeds: [newEmbed] });
    }
    else {
        message.channel.send("You have an empty team!");
    }
}

module.exports.config = {
    name: 'teamview',
    aliases: []
}