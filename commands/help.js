const Discord = require('discord.js');
const configs = require("../configs.json");
const mongoose = require('mongoose');

mongoose.connect(configs.bot.mongooseConnectLink, {useNewUrlParser: true, useUnifiedTopology: true});


exports.run = async (client, message) => {
        
          
      return message.channel.send(new Discord.MessageEmbed()
          .setColor('RANDOM')
          .setAuthor(` | HELP MENU`, message.author.displayAvatarURL({ dynamic: true }))
          .addField(`** ❯ Uptime Commands [4]**`,"`uptime`,`list`,`delete`,`count`")
          .addField(`** ❯ MISC [2]**`,"`invite`,`help`"));

}

exports.infos = {
name: 'help',
aliases: [],
}


