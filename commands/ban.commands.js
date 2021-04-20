const {
    Permissions: { FLAGS },
  } = require("discord.js")
  const { MessageEmbed } = require("discord.js")

  module.exports = {
    name: "ban",
    description: "Banuje użytkowników",
    args: true,
    usage: "<user> [days(0-7)] [reason]",
    permissions: "```ADMINISTRATOR, MANAGE_MESSAGES```",

    run(msg, args) {
      const { channel, guild, mentions, author, member } = msg
      let memberr = msg.mentions.users.first() || msg.author

      let dembed = new MessageEmbed()
        .setColor(0xF72121)
        .setTitle("❌ | Nie masz permisji do wykonania tej komendy!")
        .setFooter(`KOLEGA - ${member.username}`)
        .setTimestamp()  

        if (!member.permissionsIn(channel).has(["ADMINISTRATOR", "MANAGE_MESSAGES"])) {
            return msg.channel.send(dembed);  
          }

      let daysArg = +args[1]
  
      // Validate days
      if (!isNaN(daysArg)) {
        if (daysArg < 0) daysArg = 0
        if (daysArg > 7) daysArg = 7
      }
  
      const reasonArg = [...args].slice(isNaN(daysArg) ? 1 : 2).join(" ")
  
      const userToBan = mentions.users.first()
      const aembed = new MessageEmbed()
        .setTitle(`❌ | Podaj prawidłową nazwę użytkownika`)
        .setColor(0xf72121)
        .setFooter(`KOLEGA - ${memberr.username}`)
        .setTimestamp()

      const bembed = new MessageEmbed()
      .setTitle(`😉 | Nie możesz zbanować siebie`)
      .setColor(0xf72121)
      .setFooter(`KOLEGA - ${memberr.username}`)
        .setTimestamp()
      
      const cembed = new MessageEmbed()
      .setTitle(`🥺 | Potrzebuję wyższej rangi`)
      .setColor(0xf72121) 
      .setFooter(`KOLEGA - ${memberr.username}`)
        .setTimestamp()
  
      if (!userToBan) {
        return msg.channel.send(aembed)
      }
  
      if (userToBan.id === author.id) {
        return msg.channel.send(bembed)
      }
  
      const memberToBan = guild.members.cache.get(userToBan.id)
  
      if (!memberToBan.bannable) {
        return msg.channel.send(cembed)
      }
  
      // Add ban options
      const banOptions = {
        reason: reasonArg,
      }
  
      // Add number of days of messages to delete
      if (!isNaN(daysArg)) banOptions.days = daysArg
      
      

      // Ban user
      memberToBan.ban(banOptions).then((bannedUser) => {
        const embed = new MessageEmbed()
        .setTitle(`Użytkownik ${bannedUser.displayName} został zbanowany\n${
          reasonArg ? `Powód: ${reasonArg}` : "" }`)
        .setColor(0x4bf542)
        .setFooter(`KOLEGA - ${memberr.username}`)
        .setTimestamp()
        msg.channel.send(embed)
      })
    },
  }