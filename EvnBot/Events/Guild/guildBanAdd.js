const Discord = require('discord.js')
const { EmbedBuilder, Collection, PermissionsBitField } = Discord;
const config = require('../../Structure/config.json');
require('../../Structure/Extenders')

module.exports = class {
	constructor (client) {
		this.client = client;
	}

	async run (ban, client) {

        console.log(ban)


        const { AuditLogEvent } = require('discord.js');

const fetchedLogs = await ban.guild.fetchAuditLogs({
	type: AuditLogEvent.MemberBanAdd,
	limit: 1,
});

const firstEntry = fetchedLogs.entries.first();

console.log(firstEntry)


        let embed = new EmbedBuilder()
        .setColor(config.color.bot)
        .setAuthor({name: "Membre banni(e)", iconURL: ban.user.displayAvatarURL()})
        .addFields({name: "Membre :", value: "```"+ban.user.username+"```"})
        .addFields({name: "Modérateur :", value: "```"+firstEntry.executor.username+"```"})
        .addFields({name: "Raison :", value: "```"+(firstEntry.reason || "No reason provided.") +"```"})
        .setTimestamp()

        let logs = ban.guild.channels.cache.get(config.logsChannel)
        if(!logs) return

        logs.send({embeds: [embed]})
 
      


    }
}