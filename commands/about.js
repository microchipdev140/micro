const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('about')
        .setDescription('Provides information about the bot'),
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor('#00aaff')
            .setTitle('About Microchip')
            .setDescription('Microchip is your friendly Discord bot, here to assist you with a variety of commands and functionalities.')
            .addFields(
                { name: 'Creator:', value: 'Popsicl', inline: true },
                { name: 'Version:', value: '1.2.5', inline: true },
                { name: 'Features:', value: '• Slash commands\n• Fun commands\n• Information commands\n• And more!' }
            )
            .setFooter({ text: 'Microchip Bot', iconURL: 'https://your-bot-icon-url.com/icon.png' })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    },
};
