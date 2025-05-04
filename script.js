const listenBtn = document.getElementById("listenBtn");
const output = document.getElementById("output");

let recognition;

try {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
  recognition.continuous = false;
  recognition.interimResults = false;

  recognition.onstart = () => {
    output.textContent = "Listening...";
    listenBtn.disabled = true;
  };

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    output.textContent = `You said: ${transcript}`;
    listenBtn.disabled = false;
  };

  recognition.onerror = (event) => {
    output.textContent = `Error: ${event.error}`;
    listenBtn.disabled = false;
  };

  recognition.onend = () => {
    listenBtn.disabled = false;
  };
} catch (e) {
  output.textContent = "Speech Recognition not supported in this browser.";
  listenBtn.disabled = true;
}

listenBtn.addEventListener("click", () => {
  if (recognition) {
    recognition.start();
  }
});