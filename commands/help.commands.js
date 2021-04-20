const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "help",
    description: "Wysyła listę komend bota",

    run(msg, args) {
      
      let memberr = msg.mentions.users.first() || msg.author

      const embed = new MessageEmbed()
        .setTitle("**Siema jestem wielofunkcyjnym botem!**")
        .setColor(0xcc2c2c)
        .setDescription("**⛑︙Pomoc:** ```help, spinguj bota, aby zobaczyć jego prefix```\n**👑︙Moderacja:** ```prefix, kick, ban, clear```\n**🎉︙4Fun:**\n```time, avatar, ping, members```\n ")
        .addField("📢︙Aby wyświetlić informacje o komendzie użyj: ", "```info [komenda]```", true)
        .setFooter(`KOLEGA - ${memberr.username}`)
        .setTimestamp()
        msg.channel.send(embed) 
        
        const {
          client: { commands },
        } = msg

        const name = args[0]
    const command =
      commands.get(name) ||
      commands.find((c) => c.aliases && c.aliases.includes(name))
      
    }
}