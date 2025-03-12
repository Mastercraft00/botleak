require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const axios = require('axios');

// Create a new Discord client
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent] });

// Function to get public IP address
async function getPublicIP() {
    try {
        const response = await axios.get('https://api.ipify.org?format=json');
        return response.data.ip;
    } catch (error) {
        console.error('Error fetching public IP:', error);
        return 'Unable to fetch IP';
    }
}

// When the bot is ready
client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

// Handle commands
client.on('messageCreate', async (message) => {
    // Debug: Log every message the bot receives
    console.log(`Received message: ${message.content}`);

    // Handle /ping command
    if (message.content === '/ping') {
        console.log('Executing /ping command'); // Debug log
        message.channel.send('Pong!');
    }

    // Handle getip command
    if (message.content === 'getip') {
        console.log('Executing /getip command'); // Debug log
        try {
            const ip = await getPublicIP(); // Fetch the public IP address
            console.log(`Fetched IP: ${ip}`); // Debug log the IP address
            await message.author.send(`Your public IP address is: ${ip}`); // Send the IP as a private message
        } catch (error) {
            console.error('Failed to send the IP address:', error); // Log any errors
            message.channel.send('Sorry, something went wrong while fetching your IP address.');
        }
    }
});

// Log the bot in
client.login(process.env.DISCORD_TOKEN);

console.log(`Loaded Token: ${process.env.DISCORD_TOKEN}`);

