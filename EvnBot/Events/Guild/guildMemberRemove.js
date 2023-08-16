const Discord = require('discord.js')
const { EmbedBuilder, Collection, PermissionsBitField } = Discord;
const config = require('../../Structure/config.json');
require('../../Structure/Extenders')

module.exports = class {
	constructor (client) {
		this.client = client;
	}

	async run (member, client) {

      //  console.log(member)


        const { AuditLogEvent } = require('discord.js');

const fetchedLogs = await member.guild.fetchAuditLogs({
	type: AuditLogEvent.MemberKick,
	limit: 5,
});



if(!fetchedLogs) return;

const firstEntry = fetchedLogs.entries.first();

console.log(firstEntry)

if(firstEntry.targetId !== member.id) return;

if(!firstEntry && firstEntry.action !== AuditLogEvent.MemberKick) return;




        let embed = new EmbedBuilder()
        .setColor(config.color.bot)
        .setAuthor({name: "Membre expulsé", iconURL: member.user.displayAvatarURL()})
        .addFields({name: "Membre :", value: "```"+member.user.username+"```"})
        .addFields({name: "Modérateur :", value: "```"+firstEntry.executor.username+"```"})
        .addFields({name: "Raison :", value: "```"+(firstEntry.reason || "No reason provided.") +"```"})
        .setTimestamp()

        let logs = member.guild.channels.cache.get(config.logsChannel)
        if(!logs) return

        logs.send({embeds: [embed]})
 
      


    }
}