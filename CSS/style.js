body {
  margin: 0;
  font-family: 'Segoe UI', sans-serif;
  background: linear-gradient(135deg, #2a003f, #4b007a);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.app {
  width: 95%;
  max-width: 600px;
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid #9128d3;
  border-radius: 16px;
  box-shadow: 0 0 20px #9128d3;
  padding: 20px;
  overflow: hidden;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
  color: #e0b0ff;
}

#chat {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-height: 60vh;
  overflow-y: auto;
  margin-bottom: 16px;
}

.tile {
  padding: 12px 16px;
  border-radius: 12px;
  max-width: 85%;
  word-wrap: break-word;
  animation: bounce 0.6s ease;
}

.tile.user {
  align-self: flex-end;
  background-color: #8429b3;
  box-shadow: 0 0 10px #c77bff;
}

.tile.ai {
  align-self: flex-start;
  background-color: #5e2ca5;
  box-shadow: 0 0 10px #a86cff;
}

form {
  display: flex;
  gap: 10px;
}

input {
  flex-grow: 1;
  padding: 10px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
}

button {
  background-color: #a259ff;
  color: white;
  border: none;
  padding: 10px 14px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.2s ease;
}

button:hover {
  background-color: #892cdc;
}

.controls {
  display: flex;
  gap: 10px;
  margin-bottom: 12px;
  justify-content: center;
}

footer {
  text-align: center;
  font-size: 12px;
  opacity: 0.6;
  margin-top: 10px;
}

@keyframes bounce {
  0%   { transform: scale(0.9); }
  50%  { transform: scale(1.05); }
  100% { transform: scale(1); }
}