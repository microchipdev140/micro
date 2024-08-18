const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('shapes-inc')
        .setDescription('Provides the cmds for shapes-inc'),
    async execute(interaction) {
        const helpEmbed = new EmbedBuilder()
            .setTitle('Shapes Inc. Help')
            .setDescription('Here’s how to use the chatbot system:')
            .addFields(
                { name: '@microchip activate', value: 'make the bot responds to all messages' },
                { name: '@microchip deactivate', value: 'makes the bot does not respond to any messages (maybe)' }
            )
            .setColor('Blue')
            .setFooter({ text: 'hi' });

        await interaction.reply({ embeds: [helpEmbed] });
    }
};