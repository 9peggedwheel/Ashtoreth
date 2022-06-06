module.exports = async (client, message) => {
	if (message.author.bot) return;

	const messageArray = message.content.split(' ');
	const cmd = messageArray[0];
	const args = messageArray.slice(1);

	if (message.author.bot || message.channel.type === 'dm') return;

	const prefix = "{";

	if (message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`))) return message.channel.send(`${message.guild.name}'s Prefix is \`${prefix}\`\n\nTo get a list of commands, say \`${prefix}help\``);

	if (!message.content.startsWith(prefix)) return;
	const commandfile = client.commands.get(cmd.slice(prefix.length).toString().toLowerCase()) || client.commands.get(client.aliases.get(cmd.slice(prefix.length).toString().toLowerCase()));;
	if (commandfile) {
		commandfile.run(client, message, args);
	} else {
		const fetch = require('node-fetch');
		API_URL = 'https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill';
		message.content = message.content.substring(1,message.length);
		// form the payload
		const payload = {
			inputs: {
				text: message.content
			}
		};
		// form the request headers with Hugging Face API key
		const headers = {
			'Authorization': 'Bearer ' + process.env.HUGGINGFACE_TOKEN
		};
		
		// query the server
		const response = await fetch(API_URL, {
			method: 'post',
			body: JSON.stringify(payload),
			headers: headers
		});
		const data = await response.json();
		let botResponse = '';
		if (data.hasOwnProperty('generated_text')) {
			botResponse = data.generated_text;
		} else if (data.hasOwnProperty('error')) { // error condition
			botResponse = data.error;
		}

		// send message to channel as a reply
		message.reply(botResponse);
	}
}