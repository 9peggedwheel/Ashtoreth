module.exports = (client) => {
    const channelId = "905960857601736736";
    let welcomeRole = member.guild.roles.cache.find(role => role.name === 'Member');

    member.roles.add(welcomeRole);
    const channel = member.guild.channels.cache.get(channelId);
    channel.send(`Welcome <@${member.id}> to the server!`);
    channel.send('https://media.discordapp.net/attachments/906406839736999957/906417653344784384/BJQMzfn.png');
}