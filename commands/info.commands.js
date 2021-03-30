const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "info",
    description: "Displays info about bot",

    run(msg, args) {
      const embed = new MessageEmbed()
        .setTitle("**Siema jestem botem \_! akompostownika_**")
        .setColor(0xcc2c2c)
        .setDescription("Moje komendy:\n**^info** (informacje o mnie)\n**^czas** (aktualna godzina)\n**^kick/ban;powód** (zbanowanie, wyrzucenie użytkownika)\n**^regulamin** (regulamin serwera)")
        //.addField("Autor", "\_Elish_", true)
        msg.channel.send(embed)    
    }
}