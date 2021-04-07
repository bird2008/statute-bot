const { Client, Message, MessageEmbed } = require('discord.js');
const db = require('quick.db');
const Discord = require('discord.js');

module.exports = {
    name: "add",
    category: "invitelogger",
    description: "Dodaje zaproszenia do członka serwera (jeśli nie podano kwoty lub jeśli kwota jest mniejsza niż 1, kwota jest automatycznie ustawiana na 1).",
    usage: "``<@member | memberID>`` ``[montant]``",
    aliases: ["addi"],
    permissions: ["MANAGE_GUILD"],

run(msg, args) {
    const { client, member, guild, } = msg
    guild.members.cache.get(args[0]);
    if(!member) return msg.reply("Żaden członek nie jest zgodny z podanymi informacjami.");
    let amount = parseInt(args[1]);
    if(!amount || isNaN(amount) || amount <= 0) amount = 1;
    if(!db.has(`userInvites.${guild.id}.${member.user.id}`)) {
        db.set(`userInvites.${guild.id}.${member.user.id}`, {
            count: {
                ordinaries: 0,
                bonus: 0,
                fakes: 0,
                leaves: 0,
                total: 0,
                reloaded: {
                    ordinaries: 0,
                    bonus: 0,
                    fakes: 0,
                    leaves: 0,
                    total: 0,
                }
            },
            joined: [{
                fake: false,
                by: false,
                at: member.joinedAt,
                inviteCode: false
            }]
        });
    };
    db.add(`userInvites.${guild.id}.${member.user.id}.count.bonus`, amount);
    db.add(`userInvites.${guild.id}.${member.user.id}.count.total`, amount);
    (`\`\`${amount}\`\` dodatkowe zaproszenia zostały dodane do ${member.user.toString()}.`);
},
}