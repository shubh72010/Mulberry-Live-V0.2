const chatForm = document.getElementById("chat-form");
const chatMessages = document.getElementById("chat-messages");
const chatInput = document.getElementById("chat-input");
const startListeningBtn = document.getElementById("start-listening");

const apiUrl = "https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium";
const hfToken = "Bearer YOUR_HF_API_TOKEN";

// Append message to chat
function appendMessage(sender, message) {
  const messageElem = document.createElement("div");
  messageElem.classList.add("message", sender);
  messageElem.textContent = message;
  chatMessages.appendChild(messageElem);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Speak a message aloud
function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  speechSynthesis.speak(utterance);
}

// Send user input to Hugging Face
async function fetchAIResponse(userMessage) {
  appendMessage("user", userMessage);

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Authorization": hfToken,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ inputs: userMessage })
    });

    const data = await response.json();
    const botReply = data.generated_text || data[0]?.generated_text || "I'm not sure how to respond.";
    appendMessage("ai", botReply);
    speak(botReply);
  } catch (err) {
    console.error("API Error:", err);
    appendMessage("ai", "Oops! Something went wrong.");
  }
}

// Handle form submit
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = chatInput.value.trim();
  if (message !== "") {
    fetchAIResponse(message);
    chatInput.value = "";
  }
});

// Handle speech recognition
startListeningBtn.addEventListener("click", () => {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    chatInput.value = transcript;
    chatForm.requestSubmit(); // Automatically submit
  };

  recognition.onerror = (event) => {
    console.error("Speech recognition error:", event.error);
    appendMessage("ai", "Sorry, I couldn't hear you. Try again?");
  };

  recognition.start();
});