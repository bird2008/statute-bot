const Discord = require('discord.js');
const { Client, Message, MessageEmbed } = require('discord.js');
const db = require('quick.db');
const { fromIntToLocalDate } = require('versus-tools');

module.exports = {
    name: "inviteCode",
    category: "invitelogger",
    description: "Będzie przesyłać w prywatnych wiadomościach podsumowanie regulaminu zaproszeń.",
    aliases: ["ic"],

run(msg, args) {
    const { guild, client, author} = msg
    try {
        const invites = (guild.fetchInvites())
            .filter(i => i.inviter && i.inviter.id == msg.author.id)
            .sort((a, b) => a.createdTimestamp - b.createdTimestamp)
            .array()
        let embed = new MessageEmbed()
            .setColor(0xcc2c2c)
            .setAuthor(`Twoje zaproszenia na serwerze ${guild.name}`, guild.iconURL())
        let pages = [];
        let p = [];
        for (let i = 0; i < invites.length; i++) {
            p.push(invites[i]);
            if(p.length == 5) {
                pages.push(p);
                p = [];
            };
        }; if(p.length > 0) pages.push(p);

        let reactions = ["⬅️", "➡️"];

        embed.setDescription(`${client.emotes.get("aloading").toString()} ***En cours...***`)
        
        try {
            const message = author.send(embed);
            for (let reaction of reactions) {
                message.react(reaction);
            };
            
            let page = 0;
            let loop = true;
            while (loop) {
                embed.fields = []
                embed
                    .setFooter(`Page ${page+1}/${pages.length}`)
                    .setDescription(
                        pages[page].map(invite => {
                            embed.addField(
                                invite.code,
                                `**Utilisations**: ${invite.uses}\n` +
                                `**Expire dans**: ${invite.expiresTimestamp > 0 ? fromIntToLocalDate(invite.expiresTimestamp - Date.now()) : "∞"}\n` +
                                `**Utilisations maximum**: ${invite.maxUses == 0 ? "∞" : invite.maxUses}\n` +
                                `**Salon**: ${invite.channel ? invite.channel.toString() : `${client.emotes.get("no").toString()}`}`
                            )
                        })
                    )
                message.edit(embed);
                let filter = (reaction, user) => {
                    return reactions.includes(reaction.emoji.name) && user.id == msg.author.id;
                };
                message.awaitReactions(filter, { max: 1, time: 60000, errors: ["time"] }).then(async (collected) => {
                    let reaction = collected.first();
                    if(reaction.emoji.name == "⬅️" && page > 0) page--;
                    else if(reaction.emoji.name == "➡️" && page < pages.length-1) page++;
                }).catch(() => {
                    message.delete();
                    return loop = false;
                });
                
                const userReactions = message.reactions.cache.filter(reaction => reaction.users.cache.has(author.id));
                try {
                    for (const reaction of userReactions.values()) {
                        reaction.users.remove(author.id);
                    }
                } catch {};
            };
        } catch {
            return msg.reply("Nie mogłem wysłać ci wiadomości. Odblokuj swoje prywatne wiadomości i spróbuj ponownie.", msg).catch(()=>{});
        };
    } catch (err) { console.error(err); };
}
};
