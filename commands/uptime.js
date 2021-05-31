const Discord = require('discord.js');
const configs = require("../configs.json");
const mongoose = require('mongoose');

mongoose.connect(configs.bot.mongooseConnectLink, {useNewUrlParser: true, useUnifiedTopology: true});

const Database = require('../models/uptimeModel.js');

exports.run = async (client, message, args) => {

if(!args[0] || !args[0].startsWith('https://')) return message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription(`You must enter a link to the site to be uptime!`))

Database.findOne({ 'link': args[0] }, function (err, link) { 
if(err) console.log(err)
if(link) {
return message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription(`[Link](${args[0]}) already available in the database!`))
} else {
const uptime = new Database({
_id: new mongoose.Types.ObjectId(),
userID: message.author.id,
link: args[0],
date: Date.now()
});

uptime.save().then(result => console.log(result)).catch(error => console.log(error));

message.channel.send(new Discord.MessageEmbed().setColor('GREEN').setDescription(`Successfully [Link](${args[0]}) added to database`).setFooter(`${message.author.username}`, message.author.avatarURL({dynamic: true})))
}
})
}

exports.infos = {
name: 'link-add',
aliases: ['uptime','add-link'],
}
