const { Client, GatewayIntentBits, Events, Collection } = require('discord.js');
const setBotStatus = require('./status')
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildModeration] });

// Load slash commands
client.slashCommands = new Collection();
const slashCommandsPath = path.join(__dirname, './commands');
const slashCommandFiles = fs.readdirSync(slashCommandsPath).filter(file => file.endsWith('.js'));

for (const file of slashCommandFiles) {
    const command = require(path.join(slashCommandsPath, file));
    client.slashCommands.set(command.data.name, command);
}

client.once(Events.ClientReady, () => {
    console.log('Microchip is online and ready to assist!');
    setBotStatus(client);
});

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (client.slashCommands.has(commandName)) {
        try {
            await client.slashCommands.get(commandName).execute(interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply('There was an error trying to execute that command!');
        }
    }
});

// Load moderation logs configuration
let modLogChannelId;
const configPath = path.join(__dirname, './config/modlog.json');
if (fs.existsSync(configPath)) {
    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    modLogChannelId = config.modLogChannel;
}

// Function to log moderation actions
function logModerationAction(client, action, target, moderator) {
    const channel = client.channels.cache.get(modLogChannelId);
    if (!channel) return;

    const logMessage = `${action} | **Target:** ${target} | **Moderator:** ${moderator}`;
    channel.send(logMessage);
}

// Moderation events
client.on(Events.GuildBanAdd, (ban) => {
    logModerationAction(client, 'Ban', ban.user.tag, ban.executor.tag);
});

client.on(Events.GuildBanRemove, (ban) => {
    logModerationAction(client, 'Unban', ban.user.tag, ban.executor.tag);
});

client.on(Events.GuildMemberRemove, (member) => {
    if (!member.guild.members.banned.has(member.id)) {
        logModerationAction(client, 'Kick', member.user.tag, 'Unknown (use audit logs)');
    }
});

client.on(Events.GuildMemberUpdate, (oldMember, newMember) => {
    if (oldMember.isCommunicationDisabled() && !newMember.isCommunicationDisabled()) {
        logModerationAction(client, 'Timeout Remove', newMember.user.tag, 'Unknown (use audit logs)');
    } else if (!oldMember.isCommunicationDisabled() && newMember.isCommunicationDisabled()) {
        logModerationAction(client, 'Timeout Add', newMember.user.tag, 'Unknown (use audit logs)');
    }
});

client.login(process.env.DISCORD_TOKEN);
