const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('compliment')
        .setDescription('Gives a random compliment'),
    async execute(interaction) {
        const compliments = [
            'You have a great sense of humor!',
            'You are really kind!',
            'You are an amazing friend!',
            'Your smile is contagious!',
            'You are a smart cookie!',
            'You are awesome!',
            'You have impeccable manners!',
            'You are strong!',
            'You are a ray of sunshine!'
        ];
        const compliment = compliments[Math.floor(Math.random() * compliments.length)];
        await interaction.reply(`💬 ${compliment}`);
    },
};
