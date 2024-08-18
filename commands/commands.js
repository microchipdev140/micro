const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('commands')
        .setDescription('Displays a list of available commands or details about a specific command')
        .addStringOption(option =>
            option.setName('command')
                .setDescription('The command to get details about')),
    async execute(interaction) {
        const commandName = interaction.options.getString('command');

        if (commandName) {
            // Fetch specific command details
            const command = interaction.client.slashCommands.get(commandName);
            if (!command) {
                await interaction.reply('Command not found.');
                return;
            }

            const embed = new EmbedBuilder()
                .setColor('#00aaff')
                .setTitle(`/${command.data.name}`)
                .setDescription(command.data.description)
                .setFooter({ text: 'Microchip Bot', iconURL: 'https://your-bot-icon-url.com/icon.png' })
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });
        } else {
            // List all commands
            const commands = interaction.client.slashCommands.map(cmd => `/${cmd.data.name}: ${cmd.data.description}`).join('\n');
            const embed = new EmbedBuilder()
                .setColor('#00aaff')
                .setTitle('Available Commands')
                .setDescription(commands)
                .setFooter({ text: 'Microchip Bot', iconURL: 'https://your-bot-icon-url.com/icon.png' })
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });
        }
    },
};
