const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('userinfo')
        .setDescription('Displays information about a user')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user to get information about')),
    async execute(interaction) {
        const user = interaction.options.getUser('user') || interaction.user;

        // Create an embed with user information
        const embed = new EmbedBuilder()
            .setColor('#00aaff') // Neon blue color
            .setTitle(`${user.username}'s Info`)
            .setThumbnail(user.displayAvatarURL())
            .addFields(
                { name: 'Username:', value: `${user.username}`, inline: true },
                { name: 'ID:', value: `${user.id}`, inline: true },
                { name: 'Created At:', value: `${user.createdAt.toDateString()}`, inline: false }
            )
            .setFooter({ text: 'Microchip Bot', iconURL: 'https://your-bot-icon-url.com/icon.png' }) // Optional footer
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    },
};
