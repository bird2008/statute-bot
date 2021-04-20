const { Client, Message} = require('discord.js')

const { MessageEmbed} = require("discord.js")

const { token } = require("./config/config.js")

const commandHandler = require("./handlers/command.handler")

const settingsHandler = require("./handlers/settings.handler")

const client = new Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"] })
const {
  Permissions: { FLAGS },
} = require("discord.js")

const log = console.log

commandHandler(client)

settingsHandler(client)

const rulesMessageId = "833984307331727371"

const guildRoles = {
  VERIFIED: "833982306238464001"
} 

client.on('ready', () => {
  log(`Logged in as ${client.user.tag}!`);

  client.settings.forEach((config, guildID) => {
    const { guilds } = client
  })
})

client.login(token);

client.on('message', msg => {

  const { author, guild, user, client } = msg

  const { PREFIX } = require(__dirname + "/./config/config.js")

  const { settings } = client

  const guildId = guild?.id

  const guildPrefix = settings.get(guildId)?.prefix

  let prefix = guildPrefix ? guildPrefix : PREFIX 


  let fembed = new MessageEmbed()
  .setColor(0xF72121)
  .setTitle(`Obecny prefix na tym serwerze to \`${prefix}\`.`);   


  if (msg.content.replace(/ /g, "").replace(/!/g, "") == client.user.toString()) {
    msg.channel.send(fembed);
  }
});
 
client.on('messageReactionAdd', async (reaction, user, guild) => {
  if (reaction.partial) await reaction.fetch()

  const { message } = reaction
  if (message.content === '**Aby potwierdzić regulamin naciśnij poniższą reakcję - dotaniesz możliwość wyświetlenia wszystkich kanałów!**') {
    const member = message.channel.guild.members.cache.get(user.id)

    if (reaction.emoji.name === "👍") {
      member.roles.add(guildRoles.VERIFIED)
    }
  }
}) 

client.on('messageReactionRemove', async (reaction, user, guild) => {
  if (reaction.partial) await reaction.fetch()

  const { message } = reaction
  if (message.content === '**Aby potwierdzić regulamin naciśnij poniższą reakcję - dotaniesz możliwość wyświetlenia wszystkich kanałów!**') {
    const member = message.channel.guild.members.cache.get(user.id)

    if (reaction.emoji.name === "👍") {
      member.roles.remove(guildRoles.VERIFIED)
    }
  }
}) 

setInterval(() => {
  const statuses = [
    `_help`,
    `Serwery: ${client.guilds.cache.size}`, 
    `Użytkownicy: ${client.users.cache.size}`,
    `Ping: ${client.ws.ping}ms`,
  ]
  const status = statuses[Math.floor(Math.random() *statuses.length)]
  client.user.setActivity(status, { type: "PLAYING"})
}, 5000);

client.on('rdebug', () => {})
client.on('warn', () => {})
client.on('error', () => {})