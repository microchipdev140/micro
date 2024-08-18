const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('warn')
        .setDescription('Warns a user for misbehavior.')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user to warn')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('The reason for the warning')
                .setRequired(false)),

    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason') || 'No reason provided';

        // Check if the user is a bot or the command issuer
        if (user.bot || user.id === interaction.user.id) {
            return interaction.reply({ content: 'You cannot warn this user.', ephemeral: true });
        }

        // Create a warning embed
        const warnEmbed = new EmbedBuilder()
            .setTitle('User Warned')
            .setDescription(`**User:** ${user.tag}\n**Reason:** ${reason}`)
            .setColor('Yellow')
            .setTimestamp();

        // Inform the user who was warned
        await user.send({ embeds: [warnEmbed] }).catch(() => {
            interaction.reply({ content: 'Could not send a DM to the user.', ephemeral: true });
        });

        // Confirm the action
        await interaction.reply({ content: `Succesfully warned the user with/without reason of ${reason}.`, ephemeral: true });
    }
};
