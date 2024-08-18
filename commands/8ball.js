const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('8ball')
        .setDescription('Ask the Magic 8-Ball a yes/no question')
        .addStringOption(option =>
            option.setName('question')
                .setDescription('Your yes/no question')
                .setRequired(true)),
    async execute(interaction) {
        const responses = [
            'It is certain.',
            'Without a doubt.',
            'You may rely on it.',
            'Yes, definitely.',
            'As I see it, yes.',
            'Most likely.',
            'Outlook good.',
            'Yes.',
            'Signs point to yes.',
            'Reply hazy, try again.',
            'Ask again later.',
            'Better not tell you now.',
            'Cannot predict now.',
            'Concentrate and ask again.',
            'Don’t count on it.',
            'My reply is no.',
            'My sources say no.',
            'Outlook not so good.',
            'Very doubtful.'
        ];
        const response = responses[Math.floor(Math.random() * responses.length)];
        await interaction.reply(`🎱 ${response}`);
    },
};
