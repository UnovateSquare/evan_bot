const Discord = require('discord.js')
const { EmbedBuilder, Collection, PermissionsBitField } = Discord;
const config = require('../../Structure/config.json');
const { resolve } = require('path');
require('../../Structure/Extenders')

module.exports = class {
	constructor (client) {
		this.client = client;
	}

	async run (member, client) {




		let welcomeCh = member.guild.channels.cache.get(config.welcomeCh)
		if(!welcomeCh) return;
	

		const { createCanvas, loadImage, registerFont } = require('canvas')
		const canvas = createCanvas(1440, 606)
		const ctx = canvas.getContext('2d')
	
	registerFont('EvnBot/Structure/Images/integralcf.ttf', { family: "Integral CF Heavy"});
	

	
	
	
	 ctx.fillStyle = "#000"
	 
	 
	 ctx.save();
	 
	 ctx.translate( 720, -5 );
	   ctx.rotate((45 * Math.PI) / 180);
	 ctx.beginPath()
	 ctx.roundRect(0, 0, 230, 230, 30)
	   ctx.clip();
	
		
	   ctx.rotate(-((45 * Math.PI) / 180))
	   ctx.translate(-720, 5)
		
	
	   const avatar = await loadImage(member.user.displayAvatarURL({extension: 'png', size: 4096}))
		ctx.drawImage(avatar, 570, 7, 300, 300)
		
		ctx.restore();
		
	   
		
		// Back 
	 const background = await loadImage(resolve("EvnBot/Structure/Images/welcome/back.png"))
	 ctx.drawImage(background, 0, 0, canvas.width, canvas.height)
	
	
	 ctx.textAlign = "center"
	 ctx.textBaseline = "middle"
	 ctx.fillStyle = "#ffffff"
	 ctx.font = "85px Integral CF Heavy"
	 ctx.fillText(member.user.username.toUpperCase(), 720, 456)
	  
	
	 
	let attachment = new Discord.AttachmentBuilder(canvas.toBuffer(), 'rank.png')
	
	welcomeCh.send({
	   files: [attachment]
	})

		

      


    }
}