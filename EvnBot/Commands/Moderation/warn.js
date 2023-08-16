const Command = require("../../Structure/Handlers/CommandBase");
const Discord = require('discord.js')

module.exports = class Ping extends Command {
	constructor (client) {
		super(client, {
			name: "warn",
			description: "Avertir un membre",
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
        let reason = i.options.get('raison')?.value || "Aucune raison donnée." 
        reason = `${reason}`;

        member = i.guild.members.cache.get(member)


       

		if(!member) return i.errorMessage('Cet utilisateur n`est pas sur le serveur')

        if(member.id == i.user.id) return i.errorMessage('Vous ne pouvez pas vous avertir vous même !')

        if(member.id == client.user.id) return i.errorMessage('Vous ne pouvez pas m\'avertir !')

        if(member.id === i.guild.ownerId) return i.errorMessage('Vous ne pouvez pas avertir le créateur !')
        
        

        let id = await client.makeId(6)


        await db.push(`warns_${i.guild.id}_${member.id}`, {
            id: id,
            reason: reason,
            moderator: i.user.id,
            date: Date.now()
        })


        i.reply({embeds: [
            new Discord.EmbedBuilder()
            .setColor(client.config.color.bot)
            .setDescription(`${member} a été averti !`)
        ]})
        
    

  }
};