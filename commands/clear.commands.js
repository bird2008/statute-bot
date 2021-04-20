const { MessageEmbed, Guild } = require("discord.js")
const {
    Permissions: { FLAGS },
  } = require("discord.js")

module.exports = {
    name: 'clear',
    description: "Usuwa wiadomości", 
    permissions: "```MANAGE_MESSAGES```",   

     run(msg, args) {

        const { channel, member, guild} = msg

        let memberr = msg.mentions.users.first() || msg.author
         
        let cembed = new MessageEmbed()
        .setColor(0xF72121)
        .setTitle(
            "❌ | Nie masz permisji do wykonania tej komendy!"    
        )
        .setFooter(`KOLEGA - ${member.username}`)
        .setTimestamp()

        let hembed = new MessageEmbed()
        .setColor(0xF72121)
        .setTitle(
            "❌ | Bot nie ma permisji do wykonania tej komendy!"    
        )
        .setFooter(`KOLEGA - ${member.username}`)
        .setTimestamp()

        if (!member.permissionsIn(channel).has(["MANAGE_MESSAGES"])) {
            return msg.channel.send(cembed);  
          }

          if (!guild.me.permissionsIn(channel).has(["MANAGE_MESSAGES"])) {
            return msg.channel.send(hembed);
          }

        let aembed = new MessageEmbed()
            .setColor(0xF72121)
            .setTitle(
                "❌ | Podaj ilość wiadomości do usunięcia!"
                )
                .setFooter(`KOLEGA - ${memberr.username}`)
                .setTimestamp()

        let bembed = new MessageEmbed()
            .setColor(0xF72121)
            .setTitle(
                "❌ | Nie możesz usunąć więcej niż 100 wiadomości!"
                )   
                .setFooter(`KOLEGA - ${memberr.username}`)
                .setTimestamp()

        if(!args[0] || args[0] < 1) return msg.channel.send(aembed);

        if(args[0] < 100 && !args[0] < 1) {
            let embed = new MessageEmbed()
            .setColor(0x4bf542)
            .setTitle(
                "✅ | Usunąłeś " + args[0] +  " wiadomości!"
            )
            .setFooter(`KOLEGA - ${memberr.username}`)
        .setTimestamp()
            msg.channel.send(embed);    
        } 
 
        //if(isNaN(args[0])) return msg.reply("Please type a real number!");

        if(args[0] > 100) return msg.channel.send(bembed);
        
        //if(args[0] ) return msg.channel.send(aembed);
 
        msg.channel.messages.fetch({ limit: args[0]}).then(messages =>{
        msg.channel.bulkDelete(messages)
    });
 
 }
}   
