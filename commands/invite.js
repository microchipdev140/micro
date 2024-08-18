const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('invite')
        .setDescription('Generates an invite link for the bot with a chance of an error'),
    async execute(interaction) {
        // Simulate a 50% chance of error
        const hasError = Math.random() < 0.5;

        if (hasError) {
            // Simulate an error
            await interaction.reply('Oops! Something went wrong while generating the invite link. Please try again later.');
        } else {
            // Provide the invite link
            const inviteLink = `https://discord.com/oauth2/authorize?client_id=1270834434765095112&permissions=8&integration_type=0&scope=bot`;

            await interaction.reply(`Here is the invite link for Microchip: [Invite Microchip](<${inviteLink}>)`);
        }
    },
};
