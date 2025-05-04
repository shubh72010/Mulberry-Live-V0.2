// Speech Recognition
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

// AI Fallback API Logic
const apiList = [
    {
        name: 'Fallback API 1',
        url: 'https://api.duckduckgo.com/?q=',
        method: 'GET',
        processResponse: (response) => response.AbstractText
    },
    {
        name: 'Fallback API 2',
        url: 'https://api.openai.com/v1/completions', // This is for example
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        processResponse: (response) => response.choices[0].text
    }
];

let currentApiIndex = 0;

function sendMessage() {
    const userMessage = document.getElementById('user-input').value;
    if (!userMessage) return;

    appendMessage(userMessage, 'user');
    document.getElementById('user-input').value = '';
    document.getElementById('send-button').disabled = true;

    fetchAIResponse(userMessage);
}

function appendMessage(message, sender) {
    const messagesContainer = document.getElementById('messages');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender);
    messageDiv.innerText = message;
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function fetchAIResponse(userMessage) {
    const api = apiList[currentApiIndex];

    fetch(api.url + encodeURIComponent(userMessage), {
        method: api.method,
        headers: api.headers || {},
        body: api.method === 'POST' ? JSON.stringify({ prompt: userMessage }) : null
    })
    .then(response => response.json())
    .then(responseData => {
        const aiMessage = api.processResponse(responseData);
        appendMessage(aiMessage, 'ai');
    })
    .catch((error) => {
        console.error('API Error:', error);
        switchApi();
    });
}

function switchApi() {
    currentApiIndex = (currentApiIndex + 1) % apiList.length;
    fetchAIResponse(document.getElementById('user-input').value);
}