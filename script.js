// Speech Recognition setup
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'en-US';

let isListening = false;

function startListening() {
    if (isListening) {
        recognition.stop();
        document.getElementById('start-button').textContent = 'Start Listening';
        isListening = false;
    } else {
        recognition.start();
        document.getElementById('start-button').textContent = 'Stop Listening';
        isListening = true;
    }
}

recognition.onresult = (event) => {
    const userInput = event.results[0][0].transcript;
    document.getElementById('user-input').value = userInput;
    sendMessage();
};

recognition.onerror = (event) => {
    console.error('Speech Recognition Error: ', event);
    alert('An error occurred with speech recognition.');
};

// Send message to AI
function sendMessage() {
    const userMessage = document.getElementById('user-input').value;
    if (!userMessage) return;

    appendMessage(userMessage, 'user');
    document.getElementById('user-input').value = '';
    document.getElementById('send-button').disabled = true;

    getAIResponse(userMessage);
}

// Display user or AI messages
function appendMessage(message, sender) {
    const messagesContainer = document.getElementById('messages');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender);
    messageDiv.innerText = message;
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Fallback AI response if APIs fail
function getAIResponse(userMessage) {
    const fallbackMessage = "Sorry, I couldn't get a response. But I'm here!";
    appendMessage(fallbackMessage, 'ai');
    document.getElementById('send-button').disabled = false;
}