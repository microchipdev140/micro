const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong and latency'),
    async execute(interaction) {
        const sent = Date.now();
        await interaction.reply('🏓 Pong!');
        const latency = Date.now() - sent;
        await interaction.editReply(`🏓 Pong! Latency is ${latency}ms`);
    },
};
