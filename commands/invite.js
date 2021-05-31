const Discord = require('discord.js');
const configs = require("../configs.json");
const mongoose = require('mongoose');

mongoose.connect(configs.bot.mongooseConnectLink, {useNewUrlParser: true, useUnifiedTopology: true});


exports.run = async (client, message) => {
        
          
      return message.channel.send(new Discord.MessageEmbed()
          .setColor('RANDOM')
        
          
          .setDescription(`[**INVITE ME**](https://discord.com/channels/@me/720218422222520410)`));

}

exports.infos = {
name: 'invite',
aliases: [],
}


