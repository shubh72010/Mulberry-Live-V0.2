// Get HTML elements
let userInputField = document.getElementById("user-input");
let messagesContainer = document.getElementById("messages");
let typingIndicator = document.getElementById("typing-indicator");

// Free API endpoints (No API keys required)
const apis = [
  {
    url: "https://api.pipedream.com/v1/chat",  // Pipedream - Free Chat API
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: (input) => JSON.stringify({ message: input })
  },
  {
    url: "https://api.affiliateplus.xyz/api/chat", // Example API (if available)
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: (input) => JSON.stringify({ message: input })
  },
  {
    url: "https://some-other-public-api-url", // Placeholder for another free API
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: (input) => JSON.stringify({ message: input })
  }
];

// Send message when the user presses the send button
function sendMessage() {
  let userMessage = userInputField.value;
  if (userMessage.trim() !== "") {
    appendMessage("You", userMessage, "user");
    userInputField.value = "";

    showTypingIndicator();

    // Simulate AI response after delay (2 seconds)
    setTimeout(() => {
      let aiResponse = getAIResponse(userMessage);
      appendMessage("AI", aiResponse, "ai");
      hideTypingIndicator();
    }, 2000);
  }
}

// Append message to chat window
function appendMessage(sender, message, senderClass) {
  let messageElement = document.createElement("div");
  messageElement.classList.add("message", senderClass);
  messageElement.textContent = `${sender}: ${message}`;
  messagesContainer.appendChild(messageElement);

  // Scroll to the bottom of the chat
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Show typing indicator when the AI is "thinking"
function showTypingIndicator() {
  typingIndicator.style.display = "block";
}

// Hide typing indicator when AI responds
function hideTypingIndicator() {
  typingIndicator.style.display = "none";
}

// Function to simulate AI response (using fallback API system)
async function getAIResponse(input) {
  let responseText = "";
  for (let api of apis) {
    try {
      const response = await fetch(api.url, {
        method: api.method,
        headers: api.headers,
        body: api.body(input)
      });

      if (response.ok) {
        const data = await response.json();
        responseText = data.response || "AI says: Hello! (API fallback)";
        break;
      }
    } catch (error) {
      console.error("Error with API: ", api.url, error);
    }
  }

  if (!responseText) {
    responseText = "Sorry, I couldn't get a response. But I'm here!";
  }

  return responseText;
}

// Initialize particles.js with configuration
particlesJS('particles-js', {
  particles: {
    number: {
      value: 50,
      density: {
        enable: true,
        value_area: 800
      }
    },
    color: {
      value: "#6a0dad"
    },
    shape: {
      type: "circle"
    },
    opacity: {
      value: 0.5,
      random: false,
      anim: {
        enable: true,
        speed: 1,
        opacity_min: 0.1
      }
    },
    size: {
      value: 3,
      random: true,
      anim: {
        enable: true,
        speed: 5,
        size_min: 0.1
      }
    },
    move: {
      enable: true,
      speed: 3,
      direction: "none",
      random: true,
      straight: false,
      out_mode: "out",
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200
      }
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: true,
        mode: "repulse"
      },
      onclick: {
        enable: true,
        mode: "push"
      }
    }
  },
  retina_detect: true
});