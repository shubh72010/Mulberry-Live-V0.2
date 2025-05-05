body {
  margin: 0;
  padding: 0;
  font-family: 'Segoe UI', sans-serif;
  background: #2c003e;
  color: #fff;
}

.container {
  max-width: 700px;
  margin: auto;
  padding: 1.5rem;
}

h1 {
  text-align: center;
  color: #da88ff;
  font-size: 2.5rem;
}

.tile {
  background: #3f1a5a;
  border-radius: 20px;
  padding: 1rem;
  margin: 1rem 0;
  min-height: 300px;
  overflow-y: auto;
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
}

.controls {
  text-align: center;
  margin-bottom: 1rem;
}

button {
  padding: 0.5rem 1rem;
  background: #9e4fff;
  color: white;
  border: none;
  border-radius: 10px;
  margin: 0.5rem;
  cursor: pointer;
  font-weight: bold;
}

button:disabled {
  background: #444;
  cursor: not-allowed;
}

.input-area {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

#user-input {
  flex: 1;
  padding: 0.5rem;
  border-radius: 10px;
  border: none;
  font-size: 1rem;
}

footer {
  text-align: center;
  margin-top: 1rem;
  color: #b678d8;
}