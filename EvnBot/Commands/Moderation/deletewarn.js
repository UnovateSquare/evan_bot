const Command = require("../../Structure/Handlers/CommandBase");
const Discord = require('discord.js')

module.exports = class Ping extends Command {
	constructor (client) {
		super(client, {
			name: "deletewarn",
			description: "Supprime l'avertissement d'un utilisateur",
			type: Discord.ApplicationCommandType.ChatInput,
			options: [ 
				{
					name: "membre",
					type: Discord.ApplicationCommandOptionType.User,
					description: "Membre",
					required: true,
				},
                {
					name: "id",
					type: Discord.ApplicationCommandOptionType.String,
					description: "Identifiant de l'avertissement",
					required: true,
                    min_length: 6,
                    max_length: 6,
				}
            ],
			category: "moderation",
			enabled: true,
			usage: "",
			example: "",
			memberPermissions: [Discord.PermissionFlagsBits.ManageMessages],
			botPermissions: [],
			nsfw: false,
			ownerOnly: false,
			cooldown: 1
		});
	}

	async run (client, interaction) {
		let i = interaction;

        const { db } = client;


        let member = i.options.get('membre').value;
        let id = i.options.get('id')?.value || "Aucune raison donnée..." 
        id = `${id}`;

        member = i.guild.members.cache.get(member)

       

		if(!member) return i.errorMessage('Cet utilisateur n`est pas sur le serveur')

        if(member.id == i.user.id) return i.errorMessage('Vous ne pouvez pas vous enlever un avertissement !')

        if(member.id == client.user.id) return i.errorMessage('Vous ne pouvez pas m\'avertir !')

        if(member.id === i.guild.ownerId) return i.errorMessage('Vous ne pouvez pas avertir le créateur !')
        

        let warns = await db.get(`warns_${i.guild.id}_${member.id}`)
        console.log(warns)

        if(warns.filter(w => w.id == id).length <= 0) return i.errorMessage(`Aucun avertissements de ${member} n'a pour identifiant \`${id}\` !`)

       let warnsFiltered = warns.filter(w => w.id !== id)


       await db.set(`warns_${i.guild.id}_${member.id}`, warnsFiltered)


        i.reply({embeds: [
            new Discord.EmbedBuilder()
            .setColor(client.config.color.bot)
            .setDescription(`L'avertissement de ${member} a été supprimé !`)
        ]})
        
    

  }
};