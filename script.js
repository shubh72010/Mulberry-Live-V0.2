document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.getElementById("start-button");
  const output = document.getElementById("output");

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    output.textContent = "Speech Recognition is not supported in this browser.";
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.interimResults = false;

  startButton.addEventListener("click", () => {
    output.textContent = "Listening...";
    recognition.start();
  });

  recognition.onresult = (event) => {
    const speechText = event.results[0][0].transcript;
    output.textContent = `You said: ${speechText}`;

    // Simulated AI response
    setTimeout(() => {
      output.textContent += `\nAI says: ${simulateAIResponse(speechText)}`;
    }, 1000);
  };

  recognition.onerror = (event) => {
    output.textContent = `Error: ${event.error}`;
  };

  function simulateAIResponse(text) {
    const lower = text.toLowerCase();
    if (lower.includes("hello")) return "Hi there! How can I assist?";
    if (lower.includes("how are you")) return "I'm just code, but I'm feeling functional!";
    if (lower.includes("name")) return "I'm Mulberry-AI, your assistant.";
    return "Sorry, I didn’t quite catch that.";
  }
});