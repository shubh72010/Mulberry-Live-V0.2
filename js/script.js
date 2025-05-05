// List of API endpoints (replace these with your actual APIs)
const apis = [
    "https://api.openai.com/v1/completions", // API 1 (with key, skipped for now)
    "https://api.affiliateplus.xyz/api/chat", // API 2
    "https://some-other-public-api-url", // API 3 (placeholder)
];

// Function to get the AI response from APIs
async function getAIResponse(userInput) {
    try {
        // Show the typing indicator
        document.getElementById('ai-typing').style.display = 'block';
        
        // Loop through APIs until one works
        for (let apiUrl of apis) {
            try {
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        // Include API key if necessary
                        //'Authorization': 'Bearer YOUR_API_KEY',  // Uncomment if API requires key
                    },
                    body: JSON.stringify({
                        message: userInput,
                    }),
                });

                if (!response.ok) {
                    throw new Error('API request failed');
                }

                const data = await response.json();
                const aiMessage = data.response || "Sorry, I couldn't get a response. Please try again.";

                // Hide the typing indicator and show the AI response
                document.getElementById('ai-typing').style.display = 'none';
                displayMessage(aiMessage, 'ai');
                return;  // Exit after successful API call
            } catch (error) {
                console.error('Error with API:', error);
            }
        }

        // If all APIs fail
        document.getElementById('ai-typing').style.display = 'none';
        displayMessage("Sorry, no AI response available at the moment.", 'ai');
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('ai-typing').style.display = 'none';
        displayMessage("An error occurred. Please try again.", 'ai');
    }
}

// Function to display the message in the chat UI
function displayMessage(message, sender) {
    const messageElement = document.createElement('div');
    messageElement.classList.add(sender);
    messageElement.innerText = message;
    document.getElementById('chat-container').appendChild(messageElement);
    messageElement.scrollIntoView({ behavior: 'smooth' });
}

// Function to send the user input and get AI response
document.getElementById('send-button').addEventListener('click', () => {
    const userInput = document.getElementById('user-input').value.trim();
    
    if (userInput) {
        displayMessage(userInput, 'user');
        getAIResponse(userInput);
    }

    // Clear the input field
    document.getElementById('user-input').value = '';
});

// Function to activate the speech recognition (optional)
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'en-US';

recognition.onstart = function () {
    document.getElementById('ai-typing').style.display = 'block'; // Show typing indicator
};

recognition.onresult = function (event) {
    const userSpeech = event.results[0][0].transcript;
    document.getElementById('user-input').value = userSpeech;
    getAIResponse(userSpeech);  // Get response for voice input
};

document.getElementById('start-listening').addEventListener('click', () => {
    recognition.start(); // Start listening
});

// Function to stop speech recognition
document.getElementById('stop-listening').addEventListener('click', () => {
    recognition.stop(); // Stop listening
});