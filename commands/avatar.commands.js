const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "avatar",
  description: "Wyświetla avatar użytkjownika",

  run(msg, args) {
    let member = msg.mentions.users.first() || msg.author;

    let avatar = member.displayAvatarURL({ size: 1024 });

    const embed = new MessageEmbed()
      .setAuthor(`🖼 | Avatar - ${member.username}`)
      .setImage(avatar)
      .setColor("0xebf721")
      .setFooter(`KOLEGA - ${member.username}`)
      .setTimestamp();
    msg.channel.send({ embeds: [embed] });
  },
};
