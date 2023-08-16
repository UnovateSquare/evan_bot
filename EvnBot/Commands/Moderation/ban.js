const Command = require("../../Structure/Handlers/CommandBase");
const Discord = require('discord.js')

module.exports = class Ban extends Command {
	constructor (client) {
		super(client, {
			name: "ban",
			description: "Bannir un membre",
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
					description: "Raison du bannissement",
					required: false,
                    min_length: 2,
                    max_length: 256,
				},
                {
					name: "message-a-supprimer",
					type: Discord.ApplicationCommandOptionType.Number,
					description: "Messages à supprimer",
					required: false,
                    choices: [
                        { name: 'Ne rien supprimer', value: 1 },
                        { name: 'Dernière heure', value: 2 },
                        { name: 'Dernières 6 heures', value: 3 },
                        { name: 'Dernières 12 heures', value: 4 },
                        { name: 'Dernières 24 heures', value: 5 },
                        { name: 'Derniers 3 jours', value: 6 },
                        { name: 'Derniers 7 jours', value: 7 },
                    ]
				}
			],
			category: "moderation",
			enabled: true,
			usage: "",
			example: "",
			memberPermissions: [Discord.PermissionFlagsBits.BanMembers],
			botPermissions: [Discord.PermissionFlagsBits.BanMembers],
			nsfw: false,
			ownerOnly: false,
			cooldown: 1
		});
	}

	async run (client, interaction) {
		let i = interaction;

        let member = i.options.get('membre').value;
        let deleteMessageDays = i.options.get('message-a-supprimer')?.value || 0;
        let reason = i.options.get('raison')?.value || "Aucune raison donnée." 
        reason = `${reason}`;

        member = i.guild.members.cache.get(member)

        if(!member) return i.errorMessage('Cet utilisateur n`est pas sur le serveur')

        if(member.id == i.user.id) return i.errorMessage('Vous ne pouvez pas vous bannir vous même !')

        if(member.id == client.user.id) return i.errorMessage('Vous ne pouvez pas me bannir !')

        if(member.id === i.guild.ownerId) return i.errorMessage('Vous ne pouvez pas bannir le créateur !')
        
	  //  if(!member.bannable) return i.errorMessage("Cet utilisateur a plus de permissions que moi !")



 
   let emb = new Discord.EmbedBuilder()
  .setColor(client.config.color.bot)
  .setAuthor({name:'Ban', iconURL: i.guild.iconURL()})
  .setDescription(`<a:evanban:1036753586849333268> • **${member.user.username}** a été banni(e) par ${i.user} !`)
  
  i.reply({embeds: [emb]});


   await member.ban({ deleteMessageSeconds: deleteMessageDays, reason: reason })


  }
};