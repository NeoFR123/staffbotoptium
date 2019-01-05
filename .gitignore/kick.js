const discord = require("discord.js");
const config = require('../config.json');

module.exports.run = async (bot, message, args) => {

    let target = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    let reason = args.slice(1).join(' ');
    let logs = message.guild.channels.find('name', config.logsChannel);

    if (!message.member.hasPermission('BAN_MEMBERS')) return message.reply("Vous n'avez pas le droit de faire cela !");

    if (!target) return message.reply(`S'il vous plaît veuillez spécifier un utilisateur !`);
    if (!reason) return message.reply(`S'il vous plaît veuillez spécifier une raison !`);
    if (!logs) return message.reply(`Veuillez créer un salon ${config.logsChannel} pour pouvoir kick !`);
    
    let embed = new discord.RichEmbed()
        .setColor('RANDOM')
        .setThumbnail(target.user.avatarURL)
        .addField('Membre kické', `${target.user.username} with an ID: ${target.user.id}`)
        .addField('Kické par', `${message.author.username} with an ID: ${message.author.id}`)
        .addField('Temps de kick', message.createdAt)
        .addField('Kické dans', message.channel)
        .addField('Raison', reason)
        .setFooter('Information de kick', target.user.displayAvatarURL);

    message.channel.send(`${target.user.username} a été kické par ${message.author} pour ${reason}`);
    target.kick(reason);
    logs.send(embed);

};

module.exports.help = {
    name: 'kick'
};
