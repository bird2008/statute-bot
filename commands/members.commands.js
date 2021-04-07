const { Client, Message, MessageEmbed } = require('discord.js');
const db = require('quick.db');
const Discord = require('discord.js');

 module.exports = {
    name: "members",
    category: "invitelogger",
    description: "Wysyła statystyki dotyczące członków serwera.",

run(msg, args) {
    const { guild, client } = msg
    let embed = new MessageEmbed()
        .setColor(0xcc2c2c)
        .setAuthor(guild.name, guild.iconURL())
        .addField(
            `🟩 ❱ Członkowie`,
            guild.memberCount,
            true
        ).addField("\u200b", "\u200b", true).addField(
            `🟩 ❱ Online`,
            guild.members.cache.filter(m => m.user.presence.status !== "offline").size + ` (${Math.round(guild.members.cache.filter(m => m.user.presence.status !== "offline").size / guild.memberCount * 100 * 100) / 100}%)`,
            true
        ).addField(
            `👥 ❱ Ludzie`,
            guild.members.cache.filter(m => !m.user.bot).size + ` (${Math.round(guild.members.cache.filter(m => !m.user.bot).size / guild.memberCount * 100 * 100) / 100}%)`,
            true
        ).addField("\u200b", "\u200b", true).addField(
            `🤖 ❱ Boty`,
            guild.members.cache.filter(m => m.user.bot).size + ` (${Math.round(guild.members.cache.filter(m => m.user.bot).size / guild.memberCount * 100 * 100) / 100}%)`,
            true
        ).addField(
            "📆 ❱ Dołączył w ciągu ostatnich 24 godzin",
            guild.members.cache.filter(m => m.joinedTimestamp >= Date.now() - (1000*60*60*24)).size,
            true
        ).addField("\u200b", "\u200b", true).addField(
            "📆 ❱ Dołączył w tym tygodniu",
            guild.members.cache.filter(m => m.joinedTimestamp >= Date.now() - (1000*60*60*24*7)).size,
            true
        ).addField(
            "🗓️ ❱ Dołączył w tym miesiącu",
            guild.members.cache.filter(m => m.joinedTimestamp >= Date.now() - (1000*60*60*24*7*([2, 4, 6, 8, 9, 11].includes(new Date().getMonth()) ? 31 : 30))).size,
            true
        )
    msg.channel.send(embed);
},
}