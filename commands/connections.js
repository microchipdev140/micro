const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('connections')
        .setDescription('Displays information about the bot’s support and affiliated servers, and credits'),
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor('#00aaff')
            .setTitle('Bot Connections & Credits')
            .setDescription('Here are some important links and credits related to the bot.')
            .addFields(
                { name: 'Support Server', value: '[Join our Support Server](https://discord.gg/A7YnfuEVAU)', inline: true },
                { name: 'Credits', value: 'Bot developed by Popsicl\nSpecial thanks to all contributors and supporters!', inline: false },
                { name: 'Website', value: '[microchip.gg](https://ecfad4f8-4af5-4b94-934c-8749d70ac886-00-1n1rjxccezth5.sisko.replit.dev/)', inline: true }
            )
            .setFooter({ text: 'Microchip Bot', iconURL: 'https://your-bot-icon-url.com/icon.png' })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    },
};
