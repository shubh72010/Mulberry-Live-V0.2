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

    // Simulate AI response or integrate with AI API
    setTimeout(() => {
        const aiResponse = `AI response to "${speechToText}"`; // Replace with actual AI API response
        output.textContent += `\nAI says: ${aiResponse}`;
    }, 1000);
};

recognition.onerror = function (event) {
    output.textContent = `Error occurred: ${event.error}`;
};