const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "regulamin",
    description: "Displays info about bot",

    run(msg, args) { 
        const embed = new MessageEmbed()
        .setTitle("**REGULAMIN**")
        .setColor(0xcc2c2c)
        .setDescription("**1.📝WYSYŁANIE LINKÓW DO INNEGO SERWERA GROZI BANEM PERMAMENTNYM**\n**2.💎SPAMIENIE NIE POTRZEBNIE BEZ POWODU !MUTE {CZAS}**\n**3.💜NIE WYZYWAJ INNYCH GRACZ, GROZI TO BANEM NA 24H**\n**4.🏆UŻYWANIE MODULATORA GŁOSU BAN 12D**\n**5.🎉WYZYWANIE ADMINISTRACJI BAN {OKREŚLONY CZAS}**\n**6.🔊WYSYWAŁNIE PRYWATNYCH RZECZY " + "|KOGOŚ|" + "BAN=PERM**\n**7.✨NICK NIE DO OZNACZENIA" + "@" + "BAN 2D**")
        .addField("Autor", "\_! akompostownik_", true)
        msg.channel.send(embed) 
    }
}    
