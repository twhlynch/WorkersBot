import fetch from 'node-fetch';
import { commands } from './commands.js';

const token = process.env.DISCORD_TOKEN;
const application_id = process.env.DISCORD_APPLICATION_ID;

async function registerCommands() {
    const commands_url = `https://discord.com/api/v10/applications/${application_id}/commands`;
    const response = await fetch(commands_url, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bot ${token}`
        },
        method: 'PUT',
        body: JSON.stringify(commands)
    });

    if (response.ok) {
        console.log('Registered commands');
    } else {
        console.error('Error registering commands');
        const text = await response.text();
        console.error(text);
    }
}

await registerCommands();