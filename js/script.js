const apis = [
  // API 1: Affiliate+ (no key needed)
  userInput => `https://api.affiliateplus.xyz/api/chatbot?message=${encodeURIComponent(userInput)}&botname=Mulberry&ownername=Flakious`,
  
  // API 2: Some GPT-based fun bot (if you find better ones, you can add here)
  userInput => `https://some-random-api.ml/chatbot?message=${encodeURIComponent(userInput)}`,

  // Add more no-key APIs here as needed
];

const messagesContainer = document.getElementById("messages");
const input = document.getElementById("input");
const sendButton = document.getElementById("send");
const micButton = document.getElementById("start-listening");

let recognition;

function appendMessage(text, sender) {
  const message = document.createElement("div");
  message.classList.add("message", sender);
  message.innerText = text;

  // Bounce animation
  message.style.animation = "bounce 0.4s ease";
  messagesContainer.appendChild(message);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

async function getAIResponse(userInput) {
  for (const api of apis) {
    try {
      const url = api(userInput);
      const res = await fetch(url);
      const data = await res.json();
      const reply = data.message || data.response || data.reply;
      if (reply) return reply;
    } catch (err) {
      console.warn("API failed, trying next...", err);
    }
  }
  return "Sorry, I couldn't get a response. But I'm here!";
}

async function handleUserMessage() {
  const userInput = input.value.trim();
  if (!userInput) return;

  appendMessage(`You: ${userInput}`, "user");
  input.value = "";

  const aiReply = await getAIResponse(userInput);
  appendMessage(`AI: ${aiReply}`, "ai");
}

sendButton.addEventListener("click", handleUserMessage);
input.addEventListener("keypress", e => {
  if (e.key === "Enter") handleUserMessage();
});

// Speech Recognition Setup
if ("webkitSpeechRecognition" in window) {
  recognition = new webkitSpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = "en-US";

  recognition.onresult = function (event) {
    const transcript = event.results[0][0].transcript;
    input.value = transcript;
    handleUserMessage();
  };

  recognition.onerror = function (event) {
    console.error("Speech recognition error", event);
  };

  recognition.onend = function () {
    micButton.innerText = "Start Listening";
  };

  micButton.addEventListener("click", () => {
    if (micButton.innerText === "Start Listening") {
      recognition.start();
      micButton.innerText = "Stop Listening";
    } else {
      recognition.stop();
    }
  });
} else {
  micButton.disabled = true;
  micButton.innerText = "Speech not supported";
}