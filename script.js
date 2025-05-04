const startBtn = document.getElementById("startBtn");
const speechText = document.getElementById("speechText");
const aiResponse = document.getElementById("aiResponse");

const synth = window.speechSynthesis;

startBtn.addEventListener("click", () => {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = "en-US";
  recognition.start();

  recognition.onresult = async (event) => {
    const transcript = event.results[0][0].transcript;
    speechText.textContent = transcript;
    aiResponse.textContent = "Thinking...";

    try {
      const res = await fetch(`https://api.affiliateplus.xyz/api/chatbot?message=${encodeURIComponent(transcript)}&botname=Mulberry&ownername=Flakious`);
      const data = await res.json();
      aiResponse.textContent = data.message;

      const utter = new SpeechSynthesisUtterance(data.message);
      utter.pitch = 1;
      utter.rate = 1;
      synth.speak(utter);
    } catch (err) {
      aiResponse.textContent = "Failed to get AI response.";
    }
  };

  recognition.onerror = () => {
    speechText.textContent = "Could not hear you.";
  };
});