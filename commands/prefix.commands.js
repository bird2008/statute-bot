const { PREFIX } = require("../config/config.js")

const { MessageEmbed } = require("discord.js")
const { set } = require("quick.db")

module.exports = {
    name: "prefix",
    description: "Zmienia prefix",
    permissions: "ADMINISTRATOR",

    run(msg, args) {
        const { channel, guild, client, member } = msg

        let memberr = msg.mentions.users.first() || msg.author

        let iembed = new MessageEmbed()
        .setColor(0xF72121)
        .setTitle("❌ | Nie masz permisji do wykonania tej komendy!" )
        .setFooter(`KOLEGA - ${memberr.username}`)
        .setTimestamp()

        if (!member.permissionsIn(channel).has(["ADMINISTRATOR"])) {
            return msg.channel.send(iembed);  
          }

        const prefixArg = args[0]

        const { settings } = client

        if (!settings.get(guild.id)) {
            settings.set(guild.id, { clocks: [], prefix: null })
        }

        if (!prefixArg) {
            let prefix = client.settings.get(guild.id).prefix
            if (!prefix) prefix = PREFIX
            channel.send(`Prefix serwera to \`${prefix}\`.`)
        } else {
           client.settings.get(guild.id).prefix = prefixArg
           client.saveConfig(guild.id)
           channel.send(`Prefix serwera został zmieniony na \`${prefixArg}\`.`)

        }

    }        
}    