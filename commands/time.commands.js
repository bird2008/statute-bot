const moment = require('moment');
const tz = require('moment-timezone');
const Discord = require('discord.js');

const { timezone, format,} = require(__dirname + "/../config/config.js");

module.exports = {
    name: "czas",
    description: "displays time",

    run(msg, args) {
        msg.reply("Jest " + moment().tz(timezone).format(format));
 }
}