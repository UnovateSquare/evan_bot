const Command = require("../../Structure/Handlers/CommandBase");
const Discord = require('discord.js')
const { Client, fetchRandom } =  require("nekos-best.js");
module.exports = class Kiss extends Command {
	constructor (client) {
		super(client, {
			name: "kiss",
			description: "Donne un bisous quelqu'un",
			type: Discord.ApplicationCommandType.ChatInput,
            options: [
                {
                          name: "membre",
                          type: Discord.ApplicationCommandOptionType.User,
                          description: "Membre",
                          required: false,
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

        


        let member = i.options.get('membre')? i.options.get('membre').value : interaction.user.id
        member = i.guild.members.cache.get(member)
		let user = member.user;

        let image = await fetchRandom("kiss")

        console.log(image)
        
    let em = new Discord.EmbedBuilder()
    .setColor(`${client.config.color.bot}`)
    .setDescription(i.options.get('membre') ? `${i.user} fait un bisous à ${member}` : `${i.user} se fait un bisous à lui-même...`)
    .setImage(`${image.results[0].url}`)
    i.reply({embeds: [em]})

  }
};