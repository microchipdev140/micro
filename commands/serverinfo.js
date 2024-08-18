const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('serverinfo')
        .setDescription('Displays information about the server'),
    async execute(interaction) {
        const guild = interaction.guild;

        // Create an embed with server information
        const embed = new EmbedBuilder()
            .setColor('#00aaff') // Neon blue color
            .setTitle(`${guild.name} Server Info`)
            .setThumbnail(guild.iconURL())
            .addFields(
                { name: 'Server Name:', value: `${guild.name}`, inline: true },
                { name: 'Total Members:', value: `${guild.memberCount}`, inline: true },
                { name: 'Creation Date:', value: `${guild.createdAt.toDateString()}`, inline: true },
                { name: 'Owner:', value: `<@${guild.ownerId}>`, inline: true },
                { name: 'Region:', value: `${guild.region}`, inline: true },
                { name: 'Verification Level:', value: `${guild.verificationLevel}`, inline: true }
            )
            .setFooter({ text: 'Microchip Bot', iconURL: 'https://your-bot-icon-url.com/icon.png' }) // Optional footer
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    },
};
