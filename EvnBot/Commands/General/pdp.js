const Command = require("../../Structure/Handlers/CommandBase");
const Discord = require('discord.js')
const { Client, fetchRandom } =  require("nekos-best.js");
module.exports = class Pdp extends Command {
	constructor (client) {
		super(client, {
			name: "pdp",
			description: "Affiche la pdp d'un membre",
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
        
    let em = new Discord.EmbedBuilder()
    .setColor(`${client.config.color.bot}`)
    .setAuthor({name: member.displayName})
    .setImage(user.displayAvatarURL({forceStatic: false, extension: 'png', size: 4096}))
    i.reply({embeds: [em]})

  }
};