const { ActivityType } = require('discord.js');

function setBotStatus(client) {
    const statuses = [
        { name: 'microchip.gg', type: ActivityType.Playing },
        { name: 'TPOT 11', type: ActivityType.Watching },
        { name: 'Server Chip', type: ActivityType.Watching },
    ];

    let index = 0;

    setInterval(() => {
        const status = statuses[index];
        client.user.setActivity(status.name, { type: status.type });

        index = (index + 1) % statuses.length;
    }, 60000); // Change status every 10 seconds
}

module.exports = setBotStatus;
