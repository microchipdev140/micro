const { SlashCommandBuilder } = require('discord.js');
const math = require('mathjs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('calculate')
        .setDescription('Evaluate a mathematical expression.')
        .addStringOption(option =>
            option.setName('expression')
                .setDescription('The mathematical expression to evaluate')
                .setRequired(true)),
    async execute(interaction) {
        const expression = interaction.options.getString('expression');

        try {
            const result = math.evaluate(expression);
            await interaction.reply(`The result of \`${expression}\` is \`${result}\`.`);
        } catch (error) {
            await interaction.reply('There was an error evaluating the expression. Please make sure it is a valid mathematical expression.');
        }
    },
};