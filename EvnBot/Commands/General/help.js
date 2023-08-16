const Command = require("../../Structure/Handlers/CommandBase");
const Discord = require('discord.js')

module.exports = class Help extends Command {
	constructor (client) {
		super(client, {
			name: "help",
			description: "Obtiens la page d'aide du bot",
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

        const file = new Discord.AttachmentBuilder('EvnBot/Structure/Images/help.png')
   
        console.log(`${client.commands.filter(c => c.help.category === "fun").map(e => `\`${e.name}\``).join(', ') }`)

    let em = new Discord.EmbedBuilder()
    .setTitle("Help")
	.setColor(`${client.config.color.bot}`)
    .addFields(
    {name: 'Fun', value: `${client.commands.filter(c => c.help.category === "fun").map(e => `\`${e.name}\``).join(', ') }`},
    {name: 'Modération', value: `${client.commands.filter(c => c.help.category === "moderation").map(e => `\`${e.name}\``).join(', ') }`},
    {name: 'Général', value: `${client.commands.filter(c => c.help.category === "general").map(e => `\`${e.name}\``).join(', ') }`},
    {name: 'Niveaux', value: `${client.commands.filter(c => c.help.category === "levels").map(e => `\`${e.name}\``).join(', ') }`},
    )
    .setImage('attachment://help.png')
    i.reply({embeds: [em], files: [file]})

  }
};