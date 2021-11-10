const { Client, Intents, Collection } = require('discord.js');
const EventHandler = require("./utils/loadEvents");
const config = require('../config.json');

module.exports = class ClientManager extends Client {
    constructor(options) {
        super(options);
        this.commands = new Collection();
        this.aliases = new Collection();
    }

    setup() {
        this.events = new EventHandler(this);
        this.events.init();

        require('./util/loadCommands')(this);

        this.login(process.env.DJS_TOKEN);
    }
};