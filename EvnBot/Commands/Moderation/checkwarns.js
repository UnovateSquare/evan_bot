const Command = require("../../Structure/Handlers/CommandBase");
const Discord = require('discord.js')

module.exports = class Warns extends Command {
	constructor (client) {
		super(client, {
			name: "warns",
			description: "Affiche les avertissements d'un membre",
			type: Discord.ApplicationCommandType.ChatInput,
			options: [ 
				{
					name: "membre",
					type: Discord.ApplicationCommandOptionType.User,
					description: "Membre",
					required: true,
				},
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

        member = i.guild.members.cache.get(member)

        if(!member) return i.errorMessage('Cet utilisateur n\'est pas sur le serveur !')

       let warns = await db.get(`warns_${i.guild.id}_${member.id}`)
       console.log(warns)

       let desc;
       if(warns.length > 0) {
       let int = 0;
        desc = warns.map(w => { 
        int++;
        return `**${int} - \`${w.id}\` : ${i.guild.members.cache.get(w.moderator) || ''}**  \n \`\`\` ${w.reason} \`\`\` \n <t:${Math.round(w.date/1000)}:f>`
       }).join('\n \n')
    } else {
        desc = `${member} n'a reçu aucun avertissement.`
    }

        i.reply({embeds: [
            new Discord.EmbedBuilder()
            .setColor(client.config.color.bot)
            .setDescription(`${desc}`)
            .setFooter({text: `${warns.length} avertissements au total`})
            .setAuthor({name: member.displayName, iconURL: member.user.displayAvatarURL()})
        ]})
        
    

  }
};