const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('electricshock')
        .setDescription('Shock someone for fun.')
        .addUserOption(option =>
            option.setName('target')
                .setDescription('The user to shock.')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('The reason for shocking.')
                .setRequired(false)),
    async execute(interaction) {
        const target = interaction.options.getUser('target');
        const reason = interaction.options.getString('reason') || 'No reason provided.';

        // Check if the target is the bot or the user issuing the command
        if (target.id === interaction.user.id) {
            return interaction.reply({ content: "You can't shock yourself!", ephemeral: true });
        }

        if (target.bot) {
            return interaction.reply({ content: "You can't shock a bot!", ephemeral: true });
        }

        // Create an embed for the shock message
        const shockEmbed = new EmbedBuilder()
            .setTitle('⚡ Electric Shock! ⚡')
            .setDescription(`**${target.username}** has been shocked!\n\n**Reason:** ${reason}`)
            .setColor('Yellow')
            .setTimestamp()
            .setFooter({ text: 'That must’ve hurt!' });

        // Send the embed
        await interaction.reply({ embeds: [shockEmbed] });
    },
};