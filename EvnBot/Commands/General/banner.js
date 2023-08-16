const Command = require("../../Structure/Handlers/CommandBase");
const Discord = require('discord.js')
const { Client, fetchRandom } =  require("nekos-best.js");
module.exports = class Banner extends Command {
	constructor (client) {
		super(client, {
			name: "banner",
			description: "Affiche la bannière d'un membre",
			type: Discord.ApplicationCommandType.ChatInput,
            options: [
                {
                          name: "membre",
                          type: Discord.ApplicationCommandOptionType.User,
                          description: "Membre",
                          required: false,
                      },
                  ],
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

        


        let member = i.options.get('membre')? i.options.get('membre').value : interaction.user.id
        member = i.guild.members.cache.get(member)
		let user = member.user;

		await user.fetch(true)


        if(!user.bannerURL()) return i.errorMessage(`Ce membre n'a pas de bannière.`)

        
    let em = new Discord.EmbedBuilder()
    .setColor(`${client.config.color.bot}`)
    .setAuthor({name: member.displayName})
    .setImage(user.bannerURL({forceStatic: false, extension: 'png', size: 4096}))
    i.reply({embeds: [em]})

  }
};