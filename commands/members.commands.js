const { Client, Message, MessageEmbed } = require('discord.js');
const db = require('quick.db');
const Discord = require('discord.js');

 module.exports = {
    name: "members",
    description: "Wysyła ilość członków serwera.",

run(msg, args) {
    const { guild, client, member } = msg

    let memberr = msg.mentions.users.first() || msg.author

    let embed = new MessageEmbed()
        .setAuthor(guild.name, guild.iconURL())
        .setTitle(
            `👥 ❱ Członkowie:` + guild.memberCount)
        .setColor(0xcc2c2c)
        .setFooter(`KOLEGA - ${memberr.username}`)
        .setTimestamp()
        
        
    msg.channel.send(embed);
},
}