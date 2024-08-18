// recipe.js
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('recipe')
        .setDescription('Get a random recipe'),

    async execute(interaction) {
        const response = await axios.get('https://api.spoonacular.com/recipes/random?apiKey=' + process.env.SPOONACULAR_API_KEY);
        const recipe = response.data.recipes[0];

        const embed = new EmbedBuilder()
            .setTitle(recipe.title)
            .setDescription(recipe.summary)
            .setImage(recipe.image)
            .setColor('#000000')
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    },
};
