module.exports = async (client) =>{
    const guild = client.guilds.cache.get('905711732444504074');
    setInterval(() =>{
        const memberCount = guild.memberCount;
        const channel = guild.channels.cache.get('905998528118128700');
        channel.setName(`Headcount: ${memberCount.toLocaleString()}`);
        console.log('Updating Member Count...');
    }, 1000000);
}