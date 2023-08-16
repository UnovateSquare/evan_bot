const Command = require("../../Structure/Handlers/CommandBase");
const Discord = require('discord.js')

module.exports = class UnTimeout extends Command {
	constructor (client) {
		super(client, {
			name: "untimeout",
			description: "Retire le timeout d'un membre",
            type: Discord.ApplicationCommandType.ChatInput,
			options: [
                {
					name: "membre",
					type: Discord.ApplicationCommandOptionType.User,
					description: "Membre",
					required: true,
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
        let reason = i.options.get('raison')?.value || "Aucune raison donnée." 
        reason = `${reason}`;

        member = i.guild.members.cache.get(member)
        if(!member) return i.errorMessage('Cet utilisateur n\'est pas sur le serveur !')

        if(!member.isCommunicationDisabled()) return i.errorMessage("Cet utilisateur n'est pas timeout !")

        if(!member.moderatable) return i.errorMessage("Cet utilisateur est administrateur !")


  await member.timeout(null, reason)
   let emb = new Discord.EmbedBuilder()
  .setColor(`${client.color.bot}`)
  .setAuthor({name:'Sanction', iconURL: i.guild.iconURL()})
  .setDescription(`<:mute:1130239701811478661> • Le timeout de ${member} a été retiré par ${i.user} !`)
  
  i.reply({embeds: [emb], components: []});


  


  }
};