const { SlashCommandBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('joke')
        .setDescription('Tells a random joke'),
    async execute(interaction) {
        const response = await fetch('https://official-joke-api.appspot.com/random_joke');
        const joke = await response.json();
        await interaction.reply(`${joke.setup} - ${joke.punchline}`);
    },
};
