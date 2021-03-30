const {
    Permissions: { FLAGS },
  } = require("discord.js")
  
  const activities = [
    "PLAYING",
    "STREAMING",
    "LISTENING",
    "WATCHING",
    "CUSTOM_STATUS",
  ]
  
  module.exports = {
    name: "bot",
    aliases: ["bot-status"],
    description: "Set bot status.",
    args: true,
    usage: "<activity-type> <name>",
    botPermissions: [FLAGS.SEND_MESSAGES],
  
    run(msg, args) {
      const { client } = msg

      client.user.setPresence({
        activity: {
          type: "LISTENING",
          name: "|_Elish_|#2824👌 || Aby dodać bota na swój serwer napisz na pv do |_ELISH_|#2824👍"
        },
      })

    },
  }    
  
     