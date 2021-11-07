module.exports = {
    name: 'clear',
    description: "Clears messages",
    async execute(message, args) {
        if (message.member.permissions.has("MANAGE_MESSAGES")) {
            if (!args[0]) return message.reply("Please specify number of messages to clear");
            if (isNaN(args[0])) return message.reply("Please enter a number");
            if (args[0] > 100) return message.reply("You cannot clear more than 100 messages");
            if (args[0] < 1) return message.reply("You must clear at least one message");
            if (args[0].indexOf(".") != -1) return message.reply("Please enter an integer number of messages to clear");
    
            await message.channel.messages.fetch({limit: args[0]}).then(messages =>{
                message.channel.bulkDelete(messages);
            });
        } else {
            message.channel.send("You don't have the permission fool");
        }
    }
}