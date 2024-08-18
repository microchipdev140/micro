const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Displays the avatar of the mentioned user or yourself')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user to get the avatar of')),
    async execute(interaction) {
        const user = interaction.options.getUser('user') || interaction.user;
        await interaction.reply(user.displayAvatarURL({ format: 'png', dynamic: true }));
    },
};
