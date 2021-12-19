const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "info",
  description: "Wyświetla informacje o komendzie",

  run(msg, args) {
    const {
      client: { commands },
    } = msg;

    const data = [];

    const name = args[0].toLowerCase();
    const command =
      commands.get(name) ||
      commands.find((c) => c.aliases && c.aliases.includes(name));

    if (!command) {
      return msg.reply(
        "Niepoprawna komenda, jeżeli chcesz zobaczyć informacje o komendzie użyj: ```info [komenda]```"
      );
    }

    let memberr = msg.mentions.users.first() || msg.author;

    if (command.permissions) {
      let xembed = new MessageEmbed()
        .setColor(0x03f8fc)
        .setTitle(`✔ | ${command.name}`)
        .setDescription(
          `**📃 | ${command.description}**\n **🎓 | Wymagane uprawnienia:** ${command.permissions}`
        )
        .setFooter(`KOLEGA - ${memberr.username}`)
        .setTimestamp();
      msg.channel.send({ embeds: [xembed] });
    } else if (!command.permissions) {
      let yembed = new MessageEmbed()
        .setColor(0x03f8fc)
        .setTitle(`✔ | ${command.name}`)
        .setDescription(`**📃 | ${command.description}**`)
        .setFooter(`KOLEGA - ${memberr.username}`)
        .setTimestamp();
      msg.channel.send({ embeds: [yembed] });
    }
  },
};
