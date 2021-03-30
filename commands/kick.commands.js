const {
    Permissions: { FLAGS },
  } = require("discord.js")
  
  module.exports = {
    name: "kick",
    description: "Kick user",
    args: true,
    usage: "<user> [reason]",
    botPermissions: [FLAGS.KICK_MEMBERS],
    userPermissions: [FLAGS.KICK_MEMBERS],
  
    run(msg, args) {
      const { channel, guild, mentions, author } = msg
  
      const reasonArg = [...args].slice(1).join(" ")
  
      const userToKick = mentions.users.first()
  
      if (!userToKick) {
        return msg.reply("Podaj prawidłową nazwę użytkownika")
      }
  
      if (userToKick.id === author.id) {
        return msg.reply("Nie możesz wyrzucić siebie😉")
      }
  
      const memberToKick = guild.members.cache.get(userToKick.id)
  
      if (!memberToKick.kickable) {
        return channel.send("Potrzebuję wyższej rangi🥺")
      }

      const { MessageEmbed } = require("discord.js")

      memberToKick.kick(reasonArg).then((res) => {
        const embed = new MessageEmbed()
        .setTitle(`Użytkownik ${res.displayName} został wyrzucony\n${
          reasonArg ? `Powód: ${reasonArg}` : "" }`)
        .setColor(0x4bf542)
        msg.channel.send(embed)
      })
    },
  }   