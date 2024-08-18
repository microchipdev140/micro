const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('calculatehelp')
        .setDescription('Provides help on how to use the calculate command.'),
    async execute(interaction) {
        const helpEmbed = new EmbedBuilder()
            .setTitle('Calculate Command Help')
            .setDescription('Here’s how to use the `/calculate` command:')
            .addFields(
                { name: 'Addition', value: '`/calculate 5 + 3`' },
                { name: 'Subtraction', value: '`/calculate 10 - 4`' },
                { name: 'Multiplication', value: '`/calculate 7 * 2`' },
                { name: 'Division', value: '`/calculate 8 / 2`' },
                { name: 'Exponentiation', value: '`/calculate 2 ^ 3`' },
                { name: 'Parentheses', value: '`/calculate (1 + 2) * 3`' }
            )
            .setColor('Blue')
            .setFooter({ text: 'Use this format to perform basic math operations.' });

        await interaction.reply({ embeds: [helpEmbed] });
    }
};