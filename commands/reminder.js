const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('remindme')
        .setDescription('Sets a reminder for yourself.')
        .addStringOption(option =>
            option.setName('time')
                .setDescription('When to send the reminder (e.g., 10m, 1h, 1d).')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('message')
                .setDescription('The reminder message.')
                .setRequired(true)),
    async execute(interaction) {
        const time = interaction.options.getString('time');
        const message = interaction.options.getString('message');

        const timeMs = parseTime(time);
        if (!timeMs) {
            return interaction.reply({ content: 'Invalid time format. Use `m`, `h`, or `d` (e.g., 10m, 1h, 1d).', ephemeral: true });
        }

        await interaction.reply({ content: `I'll remind you in ${time} to: **${message}**`, ephemeral: true });

        setTimeout(async () => {
            try {
                await interaction.user.send(`⏰ **Reminder:** ${message}`);
            } catch (error) {
                console.error('Could not send DM to user.');
            }
        }, timeMs);
    }
};

function parseTime(time) {
    const timePattern = /^(\d+)([mhd])$/;
    const match = time.match(timePattern);

    if (!match) return null;

    const amount = parseInt(match[1]);
    const unit = match[2];

    switch (unit) {
        case 'm':
            return amount * 60 * 1000; // Minutes
        case 'h':
            return amount * 60 * 60 * 1000; // Hours
        case 'd':
            return amount * 24 * 60 * 60 * 1000; // Days
        default:
            return null;
    }
}