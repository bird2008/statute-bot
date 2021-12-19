const {
  Permissions: { FLAGS },
} = require("discord.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "kick",
  description: "Usuwa użytkowników",
  args: true,
  usage: "<user> [reason]",
  permissions: "```ADMINISTRATOR, MANAGE_MESSAGES```",

  run(msg, args) {
    const { channel, guild, mentions, author, member } = msg;

    let memberr = msg.mentions.users.first() || msg.author;

    let eembed = new MessageEmbed()
      .setColor(0xf72121)
      .setTitle("❌ | Nie masz permisji do wykonania tej komendy!")
      .setFooter(`KOLEGA - ${memberr.username}`)
      .setTimestamp();

    if (
      !member.permissionsIn(channel).has(["ADMINISTRATOR", "MANAGE_MESSAGES"])
    ) {
      return msg.channel.send({ embeds: [eembed] });
    }

    const reasonArg = [...args].slice(1).join(" ");

    const userToKick = mentions.users.first();
    const aembed = new MessageEmbed()
      .setTitle(`❌ | Podaj prawidłową nazwę użytkownika`)
      .setColor(0xf72121)
      .setFooter(`KOLEGA - ${memberr.username}`)
      .setTimestamp();

    const bembed = new MessageEmbed()
      .setTitle(`😉 | Nie możesz wyrzucić siebie`)
      .setColor(0xf72121)
      .setFooter(`KOLEGA - ${memberr.username}`)
      .setTimestamp();

    const cembed = new MessageEmbed()
      .setTitle(`🥺 | Potrzebuję wyższej rangi`)
      .setColor(0xf72121)
      .setFooter(`KOLEGA - ${memberr.username}`)
      .setTimestamp();

    if (!userToKick) {
      return msg.channel.send({ embeds: [aembed] });
    }

    if (userToKick.id === author.id) {
      return msg.channel.send({ embeds: [bembed] });
    }

    const memberToKick = guild.members.cache.get(userToKick.id);

    if (!memberToKick.kickable) {
      return msg.channel.send({ embeds: [cembed] });
    }

    memberToKick.kick(reasonArg).then((res) => {
      const embed = new MessageEmbed()
        .setTitle(
          `Użytkownik ${res.displayName} został wyrzucony\n${
            reasonArg ? `Powód: ${reasonArg}` : ""
          }`
        )
        .setColor(0x4bf542)
        .setFooter(`KOLEGA - ${memberr.username}`)
        .setTimestamp();
      msg.channel.send({ embeds: [eembed] });
    });
  },
};
