const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");
const startBtn = document.getElementById("start-listening");
const stopBtn = document.getElementById("stop-listening");

let recognition;

if ("webkitSpeechRecognition" in window) {
  recognition = new webkitSpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = "en-US";

  recognition.onstart = () => {
    startBtn.disabled = true;
    stopBtn.disabled = false;
  };

  recognition.onend = () => {
    startBtn.disabled = false;
    stopBtn.disabled = true;
  };

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    userInput.value = transcript;
    handleUserInput(transcript);
  };

  startBtn.addEventListener("click", () => recognition.start());
  stopBtn.addEventListener("click", () => recognition.stop());
} else {
  startBtn.disabled = true;
  stopBtn.disabled = true;
  alert("Speech Recognition not supported in this browser.");
}

sendBtn.addEventListener("click", () => {
  const msg = userInput.value.trim();
  if (msg) {
    handleUserInput(msg);
    userInput.value = "";
  }
});

function addMessage(sender, message) {
  const msgDiv = document.createElement("div");
  msgDiv.innerHTML = `<strong>${sender}:</strong> ${message}`;
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function handleUserInput(text) {
  addMessage("You", text);
  addMessage("AI", "Typing...");

  fetch(`https://api.affiliateplus.xyz/api/chatbot?message=${encodeURIComponent(text)}&botname=Mulberry&ownername=Flakious`)
    .then(res => res.json())
    .then(data => {
      chatBox.lastChild.innerHTML = `<strong>AI:</strong> ${data.message}`;
    })
    .catch(() => {
      chatBox.lastChild.innerHTML = `<strong>AI:</strong> Sorry, I couldn't get a response. But I'm here!`;
    });
}