const listenBtn = document.getElementById('listenBtn');
const messages = document.getElementById('messages');

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = 'en-US';
recognition.interimResults = false;

listenBtn.addEventListener('click', () => {
  recognition.start();
});

recognition.addEventListener('result', (e) => {
  const transcript = e.results[0][0].transcript;
  addMessage('user', transcript);
  getAIResponse(transcript);
});

function addMessage(sender, text) {
  const msg = document.createElement('div');
  msg.classList.add('message', sender);
  msg.textContent = text;
  messages.appendChild(msg);
  messages.scrollTop = messages.scrollHeight;
}

function getAIResponse(userInput) {
  fetch('https://api.puter.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: userInput }]
    })
  })
    .then(response => response.json())
    .then(data => {
      const aiText = data.choices[0].message.content.trim();
      addMessage('ai', aiText);
      speak(aiText);
    })
    .catch(error => {
      console.error('Error:', error);
      addMessage('ai', 'Sorry, I encountered an error processing your request.');
    });
}

function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  speechSynthesis.speak(utterance);
}