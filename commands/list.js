const Discord = require('discord.js');
const configs = require("../configs.json");
const moment = require('moment');
require('moment-duration-format')
const mongoose = require('mongoose');

mongoose.connect(configs.bot.mongooseConnectLink, {useNewUrlParser: true, useUnifiedTopology: true});

const Database = require('../models/uptimeModel.js');

exports.run = (client, message, args) => {

let months = {"01": "Jan","02": "Feb","03": "Mar","04": "Apr","05": "May","06": "June","07": "July","08": "Agu","09": "Sep","10": "Oct","11": "Nov","12": "Dec"};

Database.find({}, function (err, link) {
if(err) console.log(err)

let filter = link.filter(k => k.userID == message.author.id)
let map = filter.map(r => `[Go to Link](${r.link}) | Started On **${moment(r.date).format('DD')} ${months[moment(r.date).format('MM')]} ${moment(r.date).format('YYYY')}**`).join('\n')

let list;
if(!filter) list = `I couldn't find your link in my database!`
if(filter) list = `${map}`
if(filter.length == 0) list = `I couldn't find your link in my database!`

const embed = new Discord.MessageEmbed()
.setColor('GREEN')
.setTitle(`${message.author.username}`)
.setDescription(`${list}`)

message.author.send(embed)
});
}
exports.infos = {
name: 'list',
aliases: [],
}
