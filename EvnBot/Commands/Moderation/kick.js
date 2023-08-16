const Command = require("../../Structure/Handlers/CommandBase");
const Discord = require('discord.js')

module.exports = class Kick extends Command {
	constructor (client) {
		super(client, {
			name: "kick",
			description: "Expulser un membre",
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
		let reason = i.options.get('raison')?.value || "No reason provided." 
        reason = `${reason}`;

      
        member = i.guild.members.cache.get(member)

		if(!member) return i.errorMessage('Cet utilisateur n`est pas sur le serveur')

        if(member.id == i.user.id) return i.errorMessage('Vous ne pouvez pas vous bannir vous même !')

        if(member.id == client.user.id) return i.errorMessage('Vous ne pouvez pas me bannir !')

        if(member.id === i.guild.ownerId) return i.errorMessage('Vous ne pouvez pas bannier le créateur !')
        
	    //if(!member.kickable) return i.errorMessage("Cet utilisateur a plus de permissions que moi !")

 
		

   let emb = new Discord.EmbedBuilder()
  .setColor(client.config.color.bot)
  .setAuthor({name:'Kick', iconURL: i.guild.iconURL()})
  .setDescription(`<a:evanbordel:1036753573540794438> • **${member.user.username}** a été expulsé(e) par ${i.user} !`)
  
  i.reply({embeds: [emb]});
  
  await member.kick(reason)


  


  }
};