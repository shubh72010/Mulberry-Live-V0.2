// Check for browser support 
if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    const startButton = document.getElementById("startButton");
    const output = document.getElementById("output");

    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.continuous = false;  // Stop after first result
    recognition.interimResults = false; // Show results after user stops speaking

    // Set the language for recognition
    recognition.lang = 'en-US';

    recognition.onstart = function() {
        output.textContent = "Listening...";
    };

    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        output.textContent = transcript;
    };

    recognition.onerror = function(event) {
        output.textContent = "Error occurred: " + event.error;
    };

    recognition.onend = function() {
        output.textContent = "Click 'Start Listening' to speak again.";
    };

    startButton.onclick = function() {
        recognition.start();
    };

} else {
    alert("Speech recognition is not supported in this browser.");
}