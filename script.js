const output = document.getElementById("output");
const button = document.getElementById("start-btn");
const stopButton = document.getElementById("stop-btn");
const userText = document.getElementById("user-text");
const sendBtn = document.getElementById("send-btn");
const responseBox = document.getElementById("response");
let recognition;

const aiEndpoints = [
  {
    name: "duckduckgo-instant",
    url: query => `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_redirect=1&t=mulberry`,
    parse: data => data.Abstract || "Sorry, no detailed answer available."
  },
  {
    name: "mistral-public",
    url: query => `https://mistral-api.sindresorhus.dev/?q=${encodeURIComponent(query)}`,
    parse: data => data.answer || "No response from Mistral."
  }
];

async function getAIResponse(message) {
  for (const api of aiEndpoints) {
    try {
      const res = await fetch(api.url(message));
      const data = await res.json();
      const answer = api.parse(data);
      if (answer && answer !== "") {
        return answer;
      }
    } catch (e) {
      console.warn(`API "${api.name}" failed, trying next...`);
    }
  }
  return "Sorry, I couldn't get a response. But I'm here!";
}

function appendText(user, text) {
  const div = document.createElement("div");
  div.className = "tile";
  div.innerHTML = `<strong>${user} says:</strong> ${text}`;
  output.appendChild(div);
  output.scrollTop = output.scrollHeight;
}

async function handleInput(message) {
  appendText("You", message);
  responseBox.innerText = "Thinking...";
  const response = await getAIResponse(message);
  responseBox.innerText = "";
  appendText("AI", response);
}

sendBtn.addEventListener("click", () => {
  const msg = userText.value.trim();
  if (msg) {
    handleInput(msg);
    userText.value = "";
  }
});

userText.addEventListener("keypress", e => {
  if (e.key === "Enter") {
    sendBtn.click();
  }
});

if ("webkitSpeechRecognition" in window) {
  recognition = new webkitSpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = "en-US";

  recognition.onstart = () => {
    button.innerText = "Listening...";
    button.disabled = true;
    stopButton.disabled = false;
  };

  recognition.onresult = event => {
    const transcript = event.results[0][0].transcript;
    userText.value = transcript;
    handleInput(transcript);
  };

  recognition.onerror = e => {
    appendText("System", `Speech error: ${e.error}`);
  };

  recognition.onend = () => {
    button.innerText = "Start Listening";
    button.disabled = false;
    stopButton.disabled = true;
  };

  button.addEventListener("click", () => recognition.start());
  stopButton.addEventListener("click", () => recognition.stop());
} else {
  button.disabled = true;
  alert("Web Speech API not supported in this browser.");
}