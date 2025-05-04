const startButton = document.getElementById("start-button");
const output = document.getElementById("output");

const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new speechRecognition();
recognition.lang = "en-US";
recognition.interimResults = false;

startButton.addEventListener("click", function () {
    recognition.start();
    output.textContent = "Listening...";
});

recognition.onresult = function (event) {
    const speechToText = event.results[0][0].transcript;
    output.textContent = `You said: ${speechToText}`;

    // Simulate AI response after a short delay
    setTimeout(() => {
        const aiResponse = simulateAIResponse(speechToText); // Simulated AI response function
        output.textContent += `\nAI says: ${aiResponse}`;
    }, 1000); // AI response delay (1 second)
};

// Simulated AI response function
function simulateAIResponse(userInput) {
    // This can be expanded to match specific input or integrate with a real AI model
    if (userInput.toLowerCase().includes("hello")) {
        return "Hello! How can I help you today?";
    } else if (userInput.toLowerCase().includes("how are you")) {
        return "I'm doing great, thank you!";
    } else {
        return "I'm not sure how to respond to that.";
    }
}

recognition.onerror = function (event) {
    output.textContent = `Error occurred: ${event.error}`;
};