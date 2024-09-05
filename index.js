const axios = require('axios');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Function to make API request and return the response
async function fetchData(content) {
    try {
        const response = await axios.post('https://api.shx.my.id/api/chat', {
            content: content
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Return the response data without modification
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return { error: 'Failed to fetch data' };
    }
}

// Function to handle user input
function handleUserInput() {
    rl.question('Type your message (or "stop" to exit): ', async (message) => {
        if (message.toLowerCase() === 'stop') {
            console.log('Stopping the script.');
            rl.close();
            process.exit(0);
        }

        const response = await fetchData(message);
        
        // ANSI escape code for green text
        const greenColor = '\x1b[32m';
        const resetColor = '\x1b[0m';

        console.log('Response:', `${greenColor}${response.message}${resetColor}`);

        // Continue to handle more user input
        handleUserInput();
    });
}

// Start the script
console.log('Script started. Type your message:');
handleUserInput();
