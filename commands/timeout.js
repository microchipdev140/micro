const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('timeout')
        .setDescription('Timeout a user temporarily.')
        .addUserOption(option =>
            option.setName('target')
            .setDescription('The user to timeout')
            .setRequired(true)
        )
        .addIntegerOption(option =>
            option.setName('duration')
            .setDescription('Duration of the timeout in minutes')
            .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('reason')
            .setDescription('The reason for timing out the user')
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers), // Restrict to users with Moderate Members permission
    async execute(interaction) {
        const targetUser = interaction.options.getUser('target');
        const duration = interaction.options.getInteger('duration');
        const reason = interaction.options.getString('reason') || 'No reason provided';

        const member = await interaction.guild.members.fetch(targetUser.id);

        if (!member) {
            return interaction.reply({ content: 'User not found in the server.', ephemeral: true });
        }

        if (!member.moderatable) {
            return interaction.reply({ content: 'I cannot timeout this user.', ephemeral: true });
        }

        const timeoutDuration = duration * 60 * 1000; // Convert minutes to milliseconds

        await member.timeout(timeoutDuration, reason);
        await interaction.reply(`⏳ **${targetUser.username}** has been timed out for ${duration} minutes.\nReason: ${reason}`);
    }
};