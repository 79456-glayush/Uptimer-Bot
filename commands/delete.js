const Discord = require('discord.js');
const configs = require("../configs.json");
const mongoose = require('mongoose');

mongoose.connect(configs.bot.mongooseConnectLink, {useNewUrlParser: true, useUnifiedTopology: true});

const Database = require('../models/uptimeModel.js');

exports.run = async (client, message, args) => {

await Database.find({}, async (err, link) => {

if(!link) return await message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription(`There are no projects in my database!`).setFooter(`${message.author.username}`, message.author.avatarURL({dynamic: true})))

if(!args[0] || !args[0].startsWith('https://')) return await message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription(`You must enter a valid site link to delete!`).setFooter(`${message.author.username}`, message.author.avatarURL({dynamic: true})))

if(!link.find(a => a.link === args[0])) return await message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription(`I don't have this link in my database!`).setFooter(`${message.author.username}`, message.author.avatarURL({dynamic: true})))

if(!link.filter(a => a.userID === message.author.id).find(c => c.link == args[0])) return await message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription(`You can't delete this link because you didn't add it.!`).setFooter(`${message.author.username}`, message.author.avatarURL({dynamic: true})))

await Database.deleteOne({ link: args[0]}, async (err, link) => { 

const embed = new Discord.MessageEmbed()
.setColor('GREEN')
.setDescription(`Successfully [Link](${args[0]}) it's been deleted from my database!`)

await message.channel.send(embed)
})
})
}
exports.infos = {
name: 'delete',
aliases: ["linkdelete","delete"],
}
