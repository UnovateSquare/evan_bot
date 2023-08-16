const Command = require("../../Structure/Handlers/CommandBase");
const Discord = require('discord.js')
const { Client, fetchRandom } =  require("nekos-best.js");
module.exports = class Slap extends Command {
	constructor (client) {
		super(client, {
			name: "slap",
			description: "Giffle quelqu'un",
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

        let image = await fetchRandom("slap")

        console.log(image)
        
    let em = new Discord.EmbedBuilder()
    .setColor(`${client.config.color.bot}`)
    .setDescription(i.options.get('membre') ? `${i.user} giffle ${member}` : `${i.user} se giffle lui-même...`)
    .setImage(`${image.results[0].url}`)
    i.reply({embeds: [em]})

  }
};