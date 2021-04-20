const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "ping",
    description: "Wysyła opóźnienie bota",

    run(msg, args) {
        const{ client, member } = msg
        
        let memberr = msg.mentions.users.first() || msg.author

        let gembed = new MessageEmbed()
            .setColor(0xF72121)
            .setTitle("👨‍💻 | Ping Bota to " + client.ws.ping + " ms")
            .setFooter(`KOLEGA - ${memberr.username}`)
        .setTimestamp()
        msg.channel.send(gembed)
    },
}