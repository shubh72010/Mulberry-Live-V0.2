// Define AI API endpoints
const apis = [
    "https://api.openai.com/v1/completions",  // API 1 (with key, will be skipped for now)
    "https://api.affiliateplus.xyz/api/chat", // API 2 - an example, replace with another valid endpoint
    "https://some-other-public-api-url",      // API 3 - placeholder for other free API services
];

// Replace with your actual fallback API function
async function getAIResponse(userInput) {
    for (let apiUrl of apis) {
        try {
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    // Include an API Key if the endpoint requires it
                    "Authorization": "Bearer YOUR_API_KEY" 
                },
                body: JSON.stringify({
                    prompt: userInput,
                    max_tokens: 50
                })
            });

            if (response.ok) {
                const data = await response.json();
                return data.choices[0].text.trim(); // Modify this based on API response format
            } else {
                console.log("API failed: " + apiUrl);
            }
        } catch (error) {
            console.error("Error with API", apiUrl, error);
        }
    }
    return "Sorry, I couldn't get a response. But I'm here!";
}

// Speech-to-text function
function startListening() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.onresult = async (event) => {
        const userInput = event.results[0][0].transcript;
        document.getElementById("userInput").value = userInput;  // Optional to display in input box
        console.log("You said: " + userInput);
        const aiResponse = await getAIResponse(userInput);
        document.getElementById("aiResponse").innerText = aiResponse; // Display AI response
    };
    recognition.start();
}

// Stop listening
function stopListening() {
    if (recognition) {
        recognition.stop();
    }
}

// Event listeners for speech buttons
document.getElementById("startListening").addEventListener("click", startListening);
document.getElementById("stopListening").addEventListener("click", stopListening);

// Event listener for manual input (optional)
document.getElementById("sendMessage").addEventListener("click", async () => {
    const userInput = document.getElementById("userInput").value;
    const aiResponse = await getAIResponse(userInput);
    document.getElementById("aiResponse").innerText = aiResponse;
});