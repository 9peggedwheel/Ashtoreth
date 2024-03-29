const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus  } = require("@discordjs/voice");
//getNextResource, audio something status

const queue = new Map();

const Discord = require("discord.js")

module.exports.run = async (client, message, args) => {
    const tmp2 = message.content.slice(1).split(/ +/);
    const command = tmp2.shift().toLowerCase();
    const voice_channel = message.member.voice.channel;
    if (!voice_channel) return message.channel.send('You need to be in a voice channel fool');
    const permissions = voice_channel.permissionsFor(message.client.user);
    if (!permissions.has('CONNECT')) return message.channel.send('You do not have the permission');
    if (!permissions.has('SPEAK')) return message.channel.send('You do not have the permission');

    const server_queue = queue.get(message.guild.id);

    if (command === 'play'){
        if (!args.length) return message.channel.send('You need to play something fool');
        let song = {};

        if (ytdl.validateURL(args[0])) {
            const song_info = await ytdl.getInfo(args[0]);
            song = { title: song_info.videoDetails.title, url: song_info.videoDetails.video_url }
        } else {
            const video_finder = async (query) =>{
                const video_result = await ytSearch(query);
                return (video_result.videos.length > 1) ? video_result.videos[0] : null;
            }

            const video = await video_finder(args.join(' '));
            if (video){
                song = { title: video.title, url: video.url }
            } else {
                    message.channel.send('Error finding video.');
            }
        }

        if (!server_queue){

            const queue_constructor = {
                voice_channel: voice_channel,
                text_channel: message.channel,
                connection: null,
                songs: [],
                loopone: false,
                loopall: false
            }
            
            queue.set(message.guild.id, queue_constructor);
            queue_constructor.songs.push(song);

            try {
                const connection = await joinVoiceChannel(
                {
                    channelId: message.member.voice.channel.id,
                    guildId: message.guild.id,
                    adapterCreator: message.guild.voiceAdapterCreator
                });
                queue_constructor.connection = connection;
                video_player(message.guild, queue_constructor.songs[0]);
            } catch (err) {
                queue.delete(message.guild.id);
                message.channel.send('There was an error connecting!');
                throw err;
            }
        } else{
            server_queue.songs.push(song);
            return message.channel.send(`👍 **${song.title}** added to queue!`);
        }
    }

    else if(command === 'skip') skip_song(message, server_queue);
    else if(command === 'stop') stop_song(message, server_queue);
    else if(command === 'queue') show_queue(message, server_queue);
    else if(command === 'loop') loop(message, server_queue);
    else if(command === 'loopone') loopone(message, server_queue);
    else if(command === 'loopstop') loop_stop(message, server_queue);
}

module.exports.config = {
    name: 'play',
    aliases: ['skip', 'stop', 'queue', 'loop', 'loopone', 'loopstop']
}

const video_player = async (guild, song) => {
    const song_queue = queue.get(guild.id);

    if (!song) {
        song_queue.connection.destroy();
        // song_queue.voice_channel.leave();
        queue.delete(guild.id);
        return;
    }
    const stream = ytdl(song.url, { type: 'opus', filter: 'audioonly' });

    const player = createAudioPlayer();
	const resource = createAudioResource(stream); 
	player.play(resource);
    song_queue.connection.subscribe(player);
    player.on(AudioPlayerStatus.Idle, () => {
        if (song_queue.loopone) {        
            video_player(guild, song_queue.songs[0]);
        } else if (song_queue.loopall) {
            song_queue.songs.push(song_queue.songs[0]);
            song_queue.songs.shift();
            video_player(guild, song_queue.songs[0]);
        } else {
            song_queue.songs.shift();
            video_player(guild, song_queue.songs[0]);
        }
    });
    // .on('finish', () => {
        // song_queue.songs.shift();
        // video_player(guild, song_queue.songs[0]);
    // });
    await song_queue.text_channel.send(`:hibiscus: Now playing **${song.title}**`)
}

const skip_song = (message, server_queue) => {
    if (!message.member.voice.channel) return message.channel.send('You need to be in a voice channel fool!');
    if(!server_queue){
        return message.channel.send(`There are no songs in queue 😔`);
    }
    server_queue.songs.shift();
    video_player(message.guild, server_queue.songs[0]);
}

const stop_song = (message, server_queue) => {
    if (!message.member.voice.channel) return message.channel.send('You need to be in a voice channel fool!');
    if(!server_queue){
        return message.channel.send("Can't stop if there's nothing playing fool");
    }
    server_queue.songs = [];
    server_queue.connection.destroy();
    queue.delete(message.guild.id);
    return;
}

const show_queue = (message, server_queue) => {
    if (!message.member.voice.channel) return message.channel.send('You need to be in a voice channel fool!');
    if(!server_queue){
        return message.channel.send(`There are no songs in queue 😔`);
    }

    let nowPlaying = server_queue.songs[0];
    let qMsg = `Now Playing: ${nowPlaying.title}\n------------------------\n`;

    for (var i = 1; i < server_queue.songs.length; i++) {
        qMsg += `${i}. ${server_queue.songs[i].title}\n`
    }

    message.channel.send('```' + qMsg + 'Requested by: ' + message.author.username + '```');
}

const loop = (message, server_queue) => {
    if (!message.member.voice.channel) return message.channel.send('You need to be in a voice channel fool!');
    if(!server_queue){
        return message.channel.send('You need to play something first fool!');
    }

    server_queue.loopall = true;
    server_queue.loopone = false;
    message.channel.send("Loop has been turned on for the queue!");
}

const loopone = (message, server_queue) => {
    if (!message.member.voice.channel) return message.channel.send('You need to be in a voice channel fool!');
    if(!server_queue){
        return message.channel.send('You need to play something first fool!');
    }

    server_queue.loopall = false;
    server_queue.loopone = true;
    message.channel.send("The first song is now being looped!");
}

const loop_stop = (message, server_queue) => {
    if (!message.member.voice.channel) return message.channel.send('You need to be in a voice channel fool!');
    if(!server_queue){
        return message.channel.send('You need to play something first fool!');
    }

    server_queue.loopall = false;
    server_queue.loopone = false;
    message.channel.send("Loops have been disabled!");
}