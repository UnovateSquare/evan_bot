const Discord = require('discord.js')
const { EmbedBuilder, Collection, PermissionsBitField } = Discord;
const config = require('../../Structure/config.json');
require('../../Structure/Extenders')

module.exports = class {
	constructor (client) {
		this.client = client;
	}

	async run (oldMessage, newMessage, client) {

                let message = newMessage

        //console.log(message)

        if(!message.content) return;
        if(message.author.id === client.user.id) return;





        let embed = new EmbedBuilder()
        .setColor(config.color.bot)
        .setAuthor({name: "Message modifié", iconURL: message.author.displayAvatarURL()})
        .addFields({name: "Avant :", value: "```"+oldMessage.content+"```"})
        .addFields({name: "Après :", value: "```"+newMessage.content+"```"})
        .addFields({name: "Auteur :", value: "```"+message.author.username+"```"})
        .setTimestamp()

        let logs = message.guild.channels.cache.get(config.logsChannel)
        if(!logs) return

        logs.send({embeds: [embed]})
 
      


    }
}