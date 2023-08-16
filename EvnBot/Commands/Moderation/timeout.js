const Command = require("../../Structure/Handlers/CommandBase");
const Discord = require('discord.js')

module.exports = class Timeout extends Command {
	constructor (client) {
		super(client, {
			name: "timeout",
			description: "Timeout un membre",
            type: Discord.ApplicationCommandType.ChatInput,
			options: [
                {
					name: "membre",
					type: Discord.ApplicationCommandOptionType.User,
					description: "Membre",
					required: true,
				},
                {
					name: "duree",
					type: Discord.ApplicationCommandOptionType.Number,
					description: "Durée du timeout",
					required: true,
                    choices: [
                        { name: '60 secondes', value: (60 * 1000) },
                        { name: '5 minutes', value: (300 * 1000) },
                        { name: '10 minutes', value: (600 * 1000) },
                        { name: '30 minutes', value: (1800 * 1000) },
                        { name: '1 heure', value: (3600 * 1000) },
                        { name: '3 heures', value: (10800 * 1000) },
                        { name: '12 heures', value: (43200 * 1000) },
                        { name: '1 jour', value: (86400 * 1000) },
                        { name: '3 jours', value: (259200 * 1000) },
                        { name: '1 semaine', value: (604800 * 1000) },
                    ]
				},
                {
					name: "raison",
					type: Discord.ApplicationCommandOptionType.String,
					description: "Raison",
					required: false,
                    min_length: 2,
                    max_length: 256,
				}
            ],
			category: "moderation",
			enabled: true,
			usage: "",
			example: "",
			memberPermissions: [Discord.PermissionFlagsBits.KickMembers],
			botPermissions: [Discord.PermissionFlagsBits.KickMembers],
			nsfw: false,
			ownerOnly: false,
			cooldown: 1
		});
	}

	async run (client, interaction) {
		let i = interaction;

        let member = i.options.get('membre').value;
        let duration = i.options.get('duree')?.value || 0;
        let reason = i.options.get('raison')?.value || "Aucun raison donnée."
        reason = `${reason}`;

        member = i.guild.members.cache.get(member)

    

        if(!member) return i.errorMessage('Cet utilisateur n`est pas sur le serveur')

        if(member.id == i.user.id) return i.errorMessage('Vous ne pouvez pas vous timeout vous même !')

        if(member.id == client.user.id) return i.errorMessage('Vous ne pouvez pas me timeout !')

        if(member.id === i.guild.ownerId) return i.errorMessage('Vous ne pouvez pas timeout le créateur !')

        if(!member.moderatable) return i.errorMessage("Cet utilisateur est administrateur !")
        

      

        let durations = {
         60000: `60 secondes`,
         300000: `5 minutes`,
         600000: `10 minutes`,
         1800000: `30 minutes`,
         3600000: `1 heure`,
         10800000: `3 heures`,
         43200000: `12 heures`,
         86400000: `1 jour`,
         258200000: `3 jours`,
         604800000: `1 semaine`,
        }

  await member.timeout(duration, reason)

   let emb = new Discord.EmbedBuilder()
  .setColor(`${client.config.color.bot}`)
  .setAuthor({name:'Sanction', iconURL: i.guild.iconURL()})
  .setDescription(`<:mute:1130239701811478661> • **${member}** a été timeout pour **${durations[duration]}** par ${i.user} !`)
  
  i.reply({embeds: [emb], components: []});


  }
};