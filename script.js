const chat = document.getElementById("chat");
const chatForm = document.getElementById("chat-form");
const userInput = document.getElementById("user-input");

function appendMessage(sender, message) {
  const msg = document.createElement("div");
  msg.className = `message ${sender}`;
  msg.innerText = message;
  chat.appendChild(msg);
  chat.scrollTop = chat.scrollHeight;
}

function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(utterance);
}

chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const message = userInput.value.trim();
  if (!message) return;

  appendMessage("user", message);
  userInput.value = "";

  try {
    const response = await puter.ai.chat(message);
    appendMessage("ai", response);
    speak(response);
  } catch (error) {
    appendMessage("ai", "Error getting response.");
  }
});