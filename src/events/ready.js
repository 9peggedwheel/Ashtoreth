const memberCounter = require('../../counters/member-counter');

module.exports = (client) => {
    console.log('Maid is online!');
    client.user.setActivity("Master's orders", {type: 'LISTENING'});
    client.user.setPresence({
        status: 'idle'
    });
    memberCounter(client);
};