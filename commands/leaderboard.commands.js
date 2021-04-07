const { Client, Message, MessageEmbed } = require('discord.js');
const db = require('quick.db');
const Discord = require('discord.js');

module.exports = {
    name: "leaderboard",
    category: "invitelogger",
    description: "Wysyła ranking członków z największą liczbą zaproszeń.",
    aliases: ["lb"],

run(msg, args) {
    const { client, guild, author } = msg
    const users = Object.entries(db.get(`userInvites.${guild.id}`))
        .filter(u => guild.members.cache.get(u[0]) && guild.members.cache.get(u[0]).user)
        .sort((a, b) => a[1].count.total - b[1].count.total)
    
    let p = [];
    var pages = [];
    for (let i = 0; i < users.length; i++) {
        p.push({
            userID: users[i][0],
            count: users[i][1].count,
            joined: users[i][1].joined
        });
        if(p.length == 10) {
            pages.push(p);
            p = [];
        };
    }; if(p.length > 0) pages.push(p);

    let loop = true;
    let embed = new MessageEmbed()
        .setColor(0xcc2c2c)
        .setAuthor(msg.guild.name, msg.guild.iconURL())
        .setDescription(
            `⏲Ładowanie rankingu...`
        )
    try {
        let message = msg.channel.send(embed);
        let reactions = ["⬅️", "➡️"];
        if(pages.length > 1) for(let reaction of reactions) message.react(reaction);
        
        let page = 0;
        while(loop) {
            embed
                .setFooter(`Page ${page+1}/${pages.length}`)
                .setDescription(
                    pages[page].map(p => `**${pages[page].indexOf(p) + 1 + 10*pages.indexOf(pages[page])}.** ${client.users.cache.get(p.userID).toString()} - **${p.count.total}** invitations`)
                        .join("\n")
                )
            
            message.edit(embed);
            if(pages.length <= 1) return loop = false;
            let filter = (reaction, user) => {
                return reactions.includes(reaction.emoji.name) && user.id == msg.author.id;
            };
            message.awaitReactions(filter, { max: 1, time: 40000, errors: ["time"] })
            .then(async (collected) => {
                let reaction = collected.first();

                // "⬅️", "➡️"
                if(reaction.emoji.name == "⬅️" && page > 0) page--;
                else if(reaction.emoji.name == "➡️" && page < pages.length - 1) page++;
                
                const userReactions = message.reactions.cache.filter(reaction => reaction.users.cache.has(author.id));
                try {
                    for (const reaction of userReactions.values()) {
                        reaction.users.remove(author.id);
                    }
                } catch {};
            }).catch(async () => {
                message.delete().catch(()=>{});
            });
        };
    } catch { msg.reply("Nie udało mi się załadować tabeli liderów!"); }
},
}