const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('poll')
        .setDescription('Creates a poll with multiple options.')
        .addStringOption(option =>
            option.setName('question')
                .setDescription('The poll question.')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('option1')
                .setDescription('First option.')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('option2')
                .setDescription('Second option.')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('option3')
                .setDescription('Third option.')
                .setRequired(false))
        .addStringOption(option =>
            option.setName('option4')
                .setDescription('Fourth option.')
                .setRequired(false)),
    async execute(interaction) {
        const question = interaction.options.getString('question');
        const option1 = interaction.options.getString('option1');
        const option2 = interaction.options.getString('option2');
        const option3 = interaction.options.getString('option3') || null;
        const option4 = interaction.options.getString('option4') || null;

        const pollEmbed = new EmbedBuilder()
            .setColor('Blurple')
            .setTitle('📊 Poll')
            .setDescription(`**${question}**`)
            .addFields(
                { name: '1️⃣', value: option1, inline: true },
                { name: '2️⃣', value: option2, inline: true }
            );

        if (option3) pollEmbed.addFields({ name: '3️⃣', value: option3, inline: true });
        if (option4) pollEmbed.addFields({ name: '4️⃣', value: option4, inline: true });

        const pollMessage = await interaction.reply({ embeds: [pollEmbed], fetchReply: true });

        // React with options
        await pollMessage.react('1️⃣');
        await pollMessage.react('2️⃣');
        if (option3) await pollMessage.react('3️⃣');
        if (option4) await pollMessage.react('4️⃣');
    }
};