const Discord = require('discord.js');
const { Client, Message, MessageEmbed } = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: "invites",
    category: "invitelogger",
    description: "Pokazuje ilość zaproszeń danego użytkownika.",
    usage: "``[@member | memberID]``",
    aliases: ["invite", "i"],

run(msg, args) {
    const { channel, guild, mentions, author } = msg
    const member = args[0] ? msg.mentions.members.first() || msg.guild.members.cache.get(args[0]) : msg.member;
    if(!member) return msg.reply("Żaden członek nie jest zgodny z podanymi informacjami.");

    if(!db.has(`userInvites.${member.guild.id}.${member.user.id}`)) {
        db.set(`userInvites.${member.guild.id}.${member.user.id}`, {
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
    const invites = db.get(`userInvites.${member.guild.id}.${member.user.id}.count`);
    let embed = new MessageEmbed()
        .setAuthor(member.user.username, member.user.displayAvatarURL())
        .setFooter(msg.author.username, msg.author.displayAvatarURL())
        .setColor(0xcc2c2c)
        .setDescription(
            `${member.user.id == msg.author.id ? "Posiada" : member.user.toString()} **${invites.total}** zaproszeń !\n\n` +
            `✅ \`\`${invites.ordinaries}\`\` **normalne**\n` +
            `✨ \`\`${invites.bonus}\`\` **bonusowe**\n` +
            `💩 \`\`${invites.fakes}\`\` **fakeowe**\n` +
            `❌ \`\`${invites.leaves}\`\` **opóściło**`
        )
    msg.channel.send(embed);
}
}

