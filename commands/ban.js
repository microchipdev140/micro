const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Bans a user from the server.')
        .addUserOption(option => 
            option.setName('target')
            .setDescription('The user to ban')
            .setRequired(true))
        .addStringOption(option => 
            option.setName('reason')
            .setDescription('The reason for banning the user')
            .setRequired(false))
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers), // Ensures only members with ban permissions can use this command
    async execute(interaction) {
        const target = interaction.options.getUser('target');
        const reason = interaction.options.getString('reason') || 'No reason provided';

        const member = await interaction.guild.members.fetch(target.id);
        if (!member) {
            return interaction.reply({ content: 'User not found in this server.', ephemeral: true });
        }

        if (!member.bannable) {
            return interaction.reply({ content: 'I cannot ban this user, perhaps they have higher permissions.', ephemeral: true });
        }

        try {
            await member.ban({ reason });
            await interaction.reply({ content: `${target.tag} has been banned for: ${reason}` });
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'An error occurred while trying to ban this user.', ephemeral: true });
        }
    }
};