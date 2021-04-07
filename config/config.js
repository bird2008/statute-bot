const { Client, Message, MessageEmbed } = require('discord.js');
const db = require('quick.db');
const dotenv = require("dotenv").config()

module.exports = {
    token: process.env.token,
    prefix: "^",
    timezone: 'Europe/Warsaw',
    format: 'HH:mm',

    run(msg,) {
        const { member, } = msg
        if(!member.hasPermission("MANAGE_GUILD")) return msg.reply("Nie masz uprawnień do używania tego polecenia.");
    }
}