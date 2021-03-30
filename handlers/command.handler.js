const{ readdirSync } = require("fs")

const { prefix } = require(__dirname + "/../config/config.js")

const { Collection } = require("discord.js")

module.exports = (client) => {
    // Comands
    client.commands = new Collection()

    const commandFiles = readdirSync(__dirname + "/../commands").filter(file =>
        file.endsWith(".commands.js"),
    )



    for (const file of commandFiles) {
        const command = require(__dirname + `/../commands/${file}`)

        if (command.name) {
           client.commands.set(command.name, command) 
           continue
        }
    }

    console.log(commandFiles)

    client.on('message', (msg) => {

        const { MessageEmbed } = require('discord.js')

        const { author, guild } = msg
        const log = console.log

        //check if user is a bot
        if(author.bot || !guild) {
          return
        }
      
        //Ignore messages without prefix
        if (!msg.content.startsWith(prefix)) return
      
        const args = msg.content
         .slice(prefix.length)
         .trim()
         .split(/ +/g)
      
        const cmd = args.shift().toLowerCase()

        if (!client.commands.has(cmd)) return

        try {
            client.commands.get(cmd).run(msg, args)
        }catch(error) {
            console.log(error)
        }
    })
}    