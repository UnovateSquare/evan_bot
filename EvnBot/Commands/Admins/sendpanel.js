const Command = require("../../Structure/Handlers/CommandBase");
const Discord = require('discord.js')

module.exports = class SendPanel extends Command {
	constructor (client) {
		super(client, {
			name: "sendpanel",
			description: "Send the ticket panel",
			type: Discord.ApplicationCommandType.ChatInput,
            options: [
                {
					name: "channel",
					type: Discord.ApplicationCommandOptionType.Channel,
					description: "Channel",
					required: false,
				},
            ],
			category: "general",
			enabled: true,
			usage: "",
			example: "",
			memberPermissions: [Discord.PermissionFlagsBits.Administrator],
			botPermissions: [],
			nsfw: false,
			ownerOnly: false,
			cooldown: 1
		});
	}

	async run (client, interaction) {
		let i = interaction;


        await i.deferReply()

        let channel = i.options.get('channel')? i.options.get('channel').value : i.channel.id

        channel = i.guild.channels.cache.get(channel)

        
        const file = new Discord.AttachmentBuilder('EvnBot/Structure/Images/help.png')

    
        let panelEm = new Discord.EmbedBuilder()
        .setColor(client.config.color.bot)
        .setTitle('Création d\'un ticket')
        .setDescription('Veuillez choisir l\'une de ces catégories là :')
        .addFields(
            {name: '<:enveloppe:1130195668556857444> Aide', value: "> Pour toute questions sur le serveur"},
            {name: '<:sword:1130196031204757655> Report', value: "> Pour signaler un membre"},
        //    {name: '<:mailbox:1125776799608082572> Partnership', value: "> To make a partnership request"},
            {name: '<:cahier:1130195524725768332> Autre', value: "> Pour une autre raison"},
        )
        .setImage('attachment://help.png')


        let row = new Discord.ActionRowBuilder()
        .addComponents(
            new Discord.StringSelectMenuBuilder()
            .setCustomId('ticketsPanel')
            .setPlaceholder('Sélectionnez une catégorie')
            .addOptions(
                new Discord.StringSelectMenuOptionBuilder()
                .setValue('aide')
                .setEmoji('<:enveloppe:1130195668556857444>')
                .setLabel('Aide'),

                new Discord.StringSelectMenuOptionBuilder()
                .setValue('report')
                .setEmoji('<:sword:1130196031204757655>')
                .setLabel('Report'),

                new Discord.StringSelectMenuOptionBuilder()
                .setValue('autre')
                .setEmoji('<:cahier:1130195524725768332>')
                .setLabel('Autre'),

            )
    
        )



        await channel.send({ embeds: [panelEm], components: [row], files: [file] });

        i.editReply({content: 'Panel envoyé !'})
  



  }
};