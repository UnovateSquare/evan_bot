const Command = require("../../Structure/Handlers/CommandBase");
const Discord = require('discord.js')
const { Client, fetchRandom } =  require("nekos-best.js");
module.exports = class Eightball extends Command {
	constructor (client) {
		super(client, {
			name: "8ball",
			description: "Une question ?",
			type: Discord.ApplicationCommandType.ChatInput,
            options: [
                {
                          name: "question",
                          type: Discord.ApplicationCommandOptionType.String,
                          description: "Question",
                          required: true,
                      },
                  ],
			category: "fun",
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

        let question =  i.options.get('question').value 

        let reponses = ["Oui...", "Non.", "Absolument !", "Au contraire...", "Tellement !", "Hum...", "Reessaye !", "Peut-être", "Evidemment !", "Mais encore...", "Voyons...", "Ca doit être ça ouais...", "Comme c'est bizarre"]
        let reponse = Math.floor(Math.random() * reponses.length);
        let ball = reponses[reponse];
        
    let em = new Discord.EmbedBuilder()
 .setDescription(`**Question :** ${question} \n**Réponse :** ${ball}`)
 .setColor(client.config.color.bot)
    i.reply({embeds: [em]})

  }
};