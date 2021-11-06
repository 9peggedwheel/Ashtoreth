const { Client, Intents, Collection } = require('discord.js');
//const config = require('./config.json');

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS, 
        Intents.FLAGS.GUILD_MESSAGES, 
        Intents.FLAGS.GUILD_MEMBERS, 
        Intents.FLAGS.GUILD_VOICE_STATES
    ]
});

const prefix = '{';

const fs = require('fs');

const memberCounter = require('./counters/member-counter');

client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}



// client.events = new Collection();

// ["command_handler", "event_handler"].forEach((handler) =>{
//     require(`./handlers/${handler}`)(client, Discord);
// });



client.once('ready', () => {
    console.log('Maid is online!');

    memberCounter(client);
});

client.on('guildMemberAdd', guildMember =>{
    let welcomeRole = guildMember.guild.roles.cache.find(role => role.name === 'Member');

    guildMember.roles.add(welcomeRole);
    client.channels.cache.get('905960857601736736').send(`Welcome <@${guildMember.user.id}> to the server!`)
    client.channels.cache.get('905960857601736736').send('https://imgur.com/BJQMzfn.jpg')
});

client.on('messageCreate', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'ping') {
        client.commands.get('ping').execute(message, args);
    } else if (command === 'rules') {
        client.commands.get('rules').execute(message, args);
    } else if (command === 'cln') {
        message.channel.send('https://www.lightnovelpub.com/novel/i-am-a-scarecrow-and-the-demon-lord-of-terror-19072354/chapter-299');
    } else if (command === 'kick') {
        client.commands.get('kick').execute(message, args);
    } else if (command === 'ban') {
        client.commands.get('ban').execute(message, args);
    } else if (command === 'clear') {
        client.commands.get('clear').execute(message, args);
    } else if (command === 'mute') {
        client.commands.get('mute').execute(message, args);
    } else if (command === 'unmute') {
        client.commands.get('unmute').execute(message, args);
    } else if (command === 'play') {
        client.commands.get('play').execute(message, args);
    } else if (command === 'leave') {
        client.commands.get('leave').execute(message, args);
    } else if (command === 'info') {
        client.commands.get('info').execute(message, args);
    }
});

client.login(process.env.DJS_TOKEN);