const { Client} = require('discord.js')

const { token } = require("./config/config.js")

const commandHandler = require("./handlers/command.handler")

const client = new Client()

const log = console.log

commandHandler(client)

client.on('ready', () => {
  log(`Logged in as ${client.user.tag}!`);
});

client.login(token);

client.on('rdebug', () => {})
client.on('warn', () => {})
client.on('error', () => {})