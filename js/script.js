// DOM Elements
const output = document.getElementById("output");
const inputField = document.getElementById("inputField");
const sendBtn = document.getElementById("sendBtn");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");

// API Fallback System
const apiFunctions = [
  // API 1: Affiliate+
  async (message) => {
    const res = await fetch(`https://api.affiliateplus.xyz/api/chat?message=${encodeURIComponent(message)}&botname=Mulberry&ownername=Flakious`);
    const data = await res.json();
    return data.message;
  },

  // API 2: Free GPT4-o (Unofficial)
  async (message) => {
    const res = await fetch(`https://free-unoficial-gpt4o-mini-api-g70n.onrender.com/chat/?query=${encodeURIComponent(message)}`);
    const data = await res.json();
    return data.response;
  },

  // API 3: Puter.js (GPT-4o)
  async (message) => {
    if (!window.puter || !puter.ai) throw new Error("Puter not loaded");
    const response = await puter.ai.chat(message);
    return response;
  }
];

// Get AI Response
async function getAIResponse(message) {
  for (let api of apiFunctions) {
    try {
      const response = await api(message);
      if (response) return response;
    } catch (err) {
      console.warn("API failed, trying next:", err);
    }
  }
  return "Sorry, I couldn't get a response. But I'm here!";
}

// Handle Send Button
sendBtn.addEventListener("click", async () => {
  const userInput = inputField.value.trim();
  if (!userInput) return;

  output.innerHTML += `<div><b>You:</b> ${userInput}</div>`;
  inputField.value = "";

  const aiReply = await getAIResponse(userInput);
  output.innerHTML += `<div><b>AI:</b> ${aiReply}</div>`;
  output.scrollTop = output.scrollHeight;
});

// Voice Recognition
let recognition;
if ('webkitSpeechRecognition' in window) {
  recognition = new webkitSpeechRecognition();
  recognition.lang = "en-US";
  recognition.continuous = false;
  recognition.interimResults = false;

  recognition.onresult = async (event) => {
    const voiceText = event.results[0][0].transcript;
    output.innerHTML += `<div><b>You:</b> ${voiceText}</div>`;

    const aiReply = await getAIResponse(voiceText);
    output.innerHTML += `<div><b>AI:</b> ${aiReply}</div>`;
    output.scrollTop = output.scrollHeight;
  };

  recognition.onerror = (e) => {
    output.innerHTML += `<div style="color:red;"><b>Error:</b> ${e.error}</div>`;
  };
}

startBtn.addEventListener("click", () => {
  if (recognition) recognition.start();
});
stopBtn.addEventListener("click", () => {
  if (recognition) recognition.stop();
});