const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");
const chatMessages = document.getElementById("chatMessages");

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = userInput.value.trim();
  if (message !== "") {
    appendMessage(message, "user");
    userInput.value = "";
    userInput.focus();
    // Placeholder for AI response
    setTimeout(() => {
      appendMessage("This is a placeholder response from Mulberry-AI.", "ai");
    }, 600);
  }
});

function appendMessage(text, sender) {
  const messageEl = document.createElement("div");
  messageEl.classList.add("chat-message");
  messageEl.classList.add(sender === "user" ? "user-message" : "ai-message");
  messageEl.textContent = text;
  chatMessages.appendChild(messageEl);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}