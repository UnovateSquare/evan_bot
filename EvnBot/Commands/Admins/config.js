const Command = require("../../Structure/Handlers/CommandBase");
const Discord = require('discord.js');
const config = require("../../Structure/config.json");
const fs = require('fs')
module.exports = class SendPanel extends Command {
	constructor (client) {
		super(client, {
			name: "config",
			description: "Config",
			type: Discord.ApplicationCommandType.ChatInput,
            options: [
                {
					name: "logs-salon",
					type: Discord.ApplicationCommandOptionType.Channel,
					description: "Salon des logs",
					required: false,
				},
                  {
					name: "bienvenue-salon",
					type: Discord.ApplicationCommandOptionType.Channel,
					description: "Salon du bienvenue",
					required: false,
				},
                {
					name: "ticket-categorie",
					type: Discord.ApplicationCommandOptionType.Channel,
					description: "Catégorie des tickets",
					required: false,
				},
                {
					name: "ticket-role",
					type: Discord.ApplicationCommandOptionType.Role,
					description: "Rôle de support pour les tickets",
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
			ownerOnly: true,
			cooldown: 1
		});
	}

	async run (client, interaction) {
		let i = interaction;


       // var m = JSON.parse(fs.readFileSync("EvnBot/Structure/config.js").toString());


       // console.log(m)
        

        let logschannel = i.options.get('logs-salon')?.value
		if(logschannel) {
        logschannel = i.guild.channels.cache.get(logschannel)

        if(logschannel) {
			config.logsChannel = logschannel.id


			fs.writeFileSync("./EvnBot/Structure/config.json", JSON.stringify(config, null, 2))

			return i.reply({
				content: `Le salon des logs a été défini sur ${logschannel}`
			})
        }

	}
        
        
               let wcchannel = i.options.get('bienvenue-salon')?.value
		if(wcchannel) {
        wcchannel = i.guild.channels.cache.get(wcchannel)

        if(wcchannel) {
			config.welcomeCh = wcchannel.id


			fs.writeFileSync("./EvnBot/Structure/config.json", JSON.stringify(config, null, 2))

			return i.reply({
				content: `Le salon des logs a été défini sur ${wcchannel}`
			})
        }

	}


    let ticketcategory = i.options.get('ticket-categorie')?.value
    if(ticketcategory) {
    ticketcategory = i.guild.channels.cache.get(ticketcategory)

    if(ticketcategory.type !== Discord.ChannelType.GuildCategory) return i.errorMessage('Ce salon n\'est pas une catégorie.')

    if(ticketcategory) {
        config.ticketCategory = ticketcategory.id


        fs.writeFileSync("./EvnBot/Structure/config.json", JSON.stringify(config, null, 2))

        return i.reply({
            content: `La catégorie des tickets a été défini sur ${ticketcategory.name}`
        })
    }
}


    let supportrole = i.options.get('ticket-role')?.value
    if(supportrole) {
    supportrole = i.guild.roles.cache.get(supportrole)

    if(supportrole) {
        config.ticketSupportRoleId = supportrole.id


        fs.writeFileSync("./EvnBot/Structure/config.json", JSON.stringify(config, null, 2))

        return i.reply({
            content: `Le rôle des tickets a été défini sur ${supportrole.name}`
        })
    }

}




  }
};