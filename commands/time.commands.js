const moment = require("moment");
const tz = require("moment-timezone");
const { MessageEmbed } = require("discord.js");

const { timezone, format } = require(__dirname + "/../config/config.js");

module.exports = {
  name: "time",
  description: "Wyświetla czas",

  run(msg, args) {
    const { guild, client, member } = msg;

    let memberr = msg.mentions.users.first() || msg.author;

    let embed = new MessageEmbed()
      .setColor(0xcc2c2c)
      .setTitle("Jest " + moment().tz(timezone).format(format))
      .setFooter(`KOLEGA - ${memberr.username}`);
    msg.channel.send({ embeds: [embed] });
  },
};
