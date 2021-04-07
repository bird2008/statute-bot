const { Client, Message, MessageEmbed } = require('discord.js');
const db = require('quick.db');
const Discord = require('discord.js');

module.exports = {
    name: "remove",
    category: "invitelogger",
    description: "Wycofaj zaproszenia od członka serwera (jeśli nie podano kwoty lub kwota jest mniejsza niż 1, kwota jest automatycznie ustawiana na 1).",
    usage: "``<@member | memberID>`` ``[montant]``",
    aliases: ["removei"],
    permissions: ["MANAGE_GUILD"],

run(msg, args,) {
    const { client, member, guild, } = msg
    guild.members.cache.get(args[0]);
    if(!member) return client.sendError("Żaden członek nie jest zgodny z podanymi informacjami.", msg);
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
    db.subtract(`userInvites.${guild.id}.${member.user.id}.count.bonus`, amount);
    db.subtract(`userInvites.${guild.id}.${member.user.id}.count.total`, amount);
    msg.reply(`\`\`${amount}\`\` zaproszenia bonusowe zostały wycofane z ${member.user.toString()}.`);
},
}