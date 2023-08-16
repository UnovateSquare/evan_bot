const Command = require("../../Structure/Handlers/CommandBase");
const Discord = require('discord.js')

module.exports = class Ping extends Command {
	constructor (client) {
		super(client, {
			name: "ping",
			description: "Obtiens la latence du bot",
			type: Discord.ApplicationCommandType.ChatInput,
			options: [],
			category: "general",
			enabled: true,
			usage: "",
			example: "",
			memberPermissions: [],
			botPermissions: [],
			nsfw: false,
			ownerOnly: false,
			cooldown: 1
		});
	}

	async run (client, interaction) {
		let i = interaction;


    let firstReply = await i.reply({content: `🏓 Ping...`, fetchReply: true })

    i.editReply({content: "🏓 Pong", embeds: [em]})

  }
};