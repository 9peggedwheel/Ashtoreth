const teamModel = require('../../models/teamModel');
const { MessageEmbed, MessageAttachment } = require('discord.js');
const characterModel = require('../../models/characterModel');
const mongoose = require('mongoose');
const mergeImages = require('merge-images');
const Canvas = require('canvas');

module.exports.run = async (client, message, args) => {
    if (!args[0]) return message.reply("Please specify team");
    if (isNaN(args[0])) return message.reply("Please enter a number");


    const teamCheck = await teamModel.findOne({
        TeamLeader: message.author.id,
        TeamID: args[0]
    });
    if (!teamCheck) return message.channel.send(`You do not have a team ` + args[0]);
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

                const canvas = Canvas.createCanvas(1000, 451);
                const context = canvas.getContext('2d');
                const background = await Canvas.loadImage('https://i.ibb.co/GRC8BWF/cardbg.jpg');
                const cardOneImage = await Canvas.loadImage(CardOne.CardImage);
                const cardTwoImage = await Canvas.loadImage(CardTwo.CardImage);
                const cardThreeImage = await Canvas.loadImage(CardThree.CardImage);
                context.drawImage(background, 0, 0, canvas.width, canvas.height);
                context.drawImage(cardOneImage, 10, 10, 320, 431);
                context.drawImage(cardTwoImage, 340, 10, 320, 431);
                context.drawImage(cardThreeImage, 670, 10, 320, 431);
                // const attachment = new MessageAttachment(canvas.toBuffer(), 'image.png');

                const newEmbed = new MessageEmbed()
                .setColor('#EDF1FF')
                .setTitle(`${teamCheck.TeamName}`)
                .addFields(
                    {name: 'Front', value: `${CardOne.CharacterName}`},
                    {name: 'Middle', value: `${CardTwo.CharacterName}`},
                    {name: 'Back', value: `${CardThree.CharacterName}`},
                )
                .setImage(canvas.toBuffer('image/png'));
            
                message.channel.send({ embeds: [newEmbed] });
            }
            else {
                const newEmbed = new MessageEmbed()
                .setColor('#EDF1FF')
                .setTitle(`${teamCheck.TeamName}`)
                .addFields(
                    {name: 'Front', value: `${CardOne.CharacterName}`},
                    {name: 'Middle', value: `${CardTwo.CharacterName}`},
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
            .setTitle(`${teamCheck.TeamName}`)
            .addFields(
                {name: 'Front', value: `${CardOne.CharacterName}`},
                {name: 'Middle', value: `Empty`},
                {name: 'Back', value: `${CardThree.CharacterName}`},
            );
        
            message.channel.send({ embeds: [newEmbed] });
        }
        else {
            const newEmbed = new MessageEmbed()
            .setColor('#EDF1FF')
            .setTitle(`${teamCheck.TeamName}`)
            .addFields(
                {name: 'Front', value: `${CardOne.CharacterName}`},
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
            .setTitle(`${teamCheck.TeamName}`)
            .addFields(
                {name: 'Front', value: `Empty`},
                {name: 'Middle', value: `${CardTwo.CharacterName}`},
                {name: 'Back', value: `${CardThree.CharacterName}`},
            );
        
            message.channel.send({ embeds: [newEmbed] });
        }
        else {
            const newEmbed = new MessageEmbed()
            .setColor('#EDF1FF')
            .setTitle(`${teamCheck.TeamName}`)
            .addFields(
                {name: 'Front', value: `Empty`},
                {name: 'Middle', value: `${CardTwo.CharacterName}`},
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
        .setTitle(`${teamCheck.TeamName}`)
        .addFields(
            {name: 'Front', value: `Empty`},
            {name: 'Middle', value: `Empty`},
            {name: 'Back', value: `${CardThree.CharacterName}`},
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

//                    mergeImages([
//     { src: 'https/i.imgur.com/Lbg2ACQ.jpg', x: 0, y: 0} ,
//     { src: cardOneImage, x: 50, y: 0 },
//     { src: cardTwoImage, x: 0, y: 0},
//     { src: cardThreeImage, x: 50, y: 0}
// ], {
//     Canvas: Canvas,
//     Image: Image
// })
//     .then(b64 => document.querySelector('img').src = b64)