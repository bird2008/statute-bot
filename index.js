const Discord = require("discord.js");

const client = new Discord.Client({
  intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES],
});
const { MessageEmbed } = require("discord.js");
const { red } = require("hexacolors");

const { token } = require("./config/config.js");

const commandHandler = require("./handlers/command.handler");

const settingsHandler = require("./handlers/settings.handler");

const log = console.log;

commandHandler(client);

settingsHandler(client);

const rulesMessageId = "833984307331727371";

const guildRoles = {
  VERIFIED: "833982306238464001",
};

client.on("ready", () => {
  log(`Logged in as ${client.user.tag}!`);

  client.settings.forEach((config, guildID) => {
    const { guilds } = client;
  });
});

client.login(token);

client.on("messageCreate", async (msg) => {
  const { author, guild, user, client } = msg;

  const { PREFIX } = require(__dirname + "/./config/config.js");

  const { settings } = client;

  const guildId = guild?.id;

  const guildPrefix = settings.get(guildId)?.prefix;

  let prefix = guildPrefix ? guildPrefix : PREFIX;

  let fembed = new Discord.MessageEmbed()
    .setColor(red)
    .setTitle(`Obecny prefix na tym serwerze to \`${prefix}\`.`);

  if (
    msg.content.replace(/ /g, "").replace(/!/g, "") == client.user.toString()
  ) {
    msg.channel.send({ embeds: [fembed] });
  }
});

setInterval(() => {
  const statuses = [
    `_help`,
    `Serwery: ${client.guilds.cache.size}`,
    `Użytkownicy: ${client.users.cache.size}`,
    `Ping: ${client.ws.ping}ms`,
  ];
  const status = statuses[Math.floor(Math.random() * statuses.length)];
  client.user.setActivity(status, { type: "PLAYING" });
}, 5000);

client.on("rdebug", () => {});
client.on("warn", () => {});
client.on("error", () => {});
