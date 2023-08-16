const Command = require("../../Structure/Handlers/CommandBase");
const Discord = require('discord.js');
const config = require("../../Structure/config.json");
const fs = require('fs')
module.exports = class SendPanel extends Command {
	constructor (client) {
		super(client, {
			name: "massroleadd",
			description: "Ajoute d'un rôle à tout les membres",
			type: Discord.ApplicationCommandType.ChatInput,
            options: [
                {
					name: "role",
					type: Discord.ApplicationCommandOptionType.Role,
					description: "Rôle à ajouter",
					required: true,
				},
            ],
			category: "moderation",
			enabled: true,
			usage: "",
			example: "",
			memberPermissions: [Discord.PermissionFlagsBits.Administrator],
			botPermissions: [],
			nsfw: false,
			ownerOnly: true,
			cooldown: 1
		});
	}

	async run (client, interaction) {
		let i = interaction;

		let config = client.config;

        const lang = "fr"
        let guild = i.guild;

        let role = i.guild.roles.cache.get(i.options.get('role').value)

        if(!role) return i.errorMessage(`Ce rôle n'existe pas !`)

        if(guild.members.cache.get(client.user.id).roles.highest.comparePositionTo(role) < 0) return i.errorMessage(`Je ne peux pas ajouter un rôle dont la position est plus haute que mon rôle dans la hiérarchie !`)

        let membersFecthed =  await i.guild.members.fetch()

        if(membersFecthed.filter(u => !u.roles.cache.has(role.id)).size == 0) return i.errorMessage(`Tous les membres possèdent ce rôle !`)

        function addRole(member) {
            setTimeout(async() => {
                if (guild.members.cache.get(member.id)) {
                    await member.roles.add(role.id).catch(error => console.log('Couldn\'t add role for member ' + member.id + ':', error));
                }
            }, 5000)
        }
     

let progressNumber = 0;

       let emb = new Discord.EmbedBuilder()
       .setColor(`${client.config.color.bot}`)
       .setAuthor({name: `${lang === "fr" ? "Gestion de Rôles" : "Roles Management"}`, iconURL: i.guild.iconURL()})
	   .setDescription(`${lang === "fr" ? `Ajout du rôle ${role} à tout les membres du serveur en cours` : `Add the role ${role} to all members of the server in progress`}...`)

      let message = await i.reply({embeds: [emb], fetchReply: true})

     i.guild.members.fetch().then(async(members) => {
        let memberCount = members.filter(u => !u.roles.cache.has(role.id)).size
        members.filter(u => !u.roles.cache.has(role.id)).forEach(async memberId => {

            await memberId.fetch(true)

		progressNumber++;
		
		if(progressNumber == memberCount) {
		emb.setDescription(`${lang === "fr" ? `Le rôle ${role} a été ajouté aux **${memberCount} membres** qui ne l'avaient pas !` : `The role ${role} has been added to the **${memberCount} members** that did not have it!`}`)	
		} else {
			emb.setDescription(`${lang === "fr" ? `Ajout du rôle ${role} à tout les membres du serveur en cours` : `Add the role ${role} to all members of the server in progress`} **( ${progressNumber}/${memberCount} )**...`)	
		}
        message.edit({ embeds: [emb] })
		 addRole(memberId)
      })

      })




  }
};