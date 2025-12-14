let socket;

export function connectWebSocket() {
  socket = new WebSocket(
    "wss://real-time-audio-streaming.onrender.com/audio-stream"
  );

  socket.onopen = () => {
    console.log("WebSocket connected");
  };

  socket.onmessage = (event) => {
    const transcript = document.getElementById("transcript");

    const placeholder = transcript.querySelector(".placeholder");
    if (placeholder) placeholder.remove();

    const line = document.createElement("div");
    line.textContent = event.data;

    transcript.appendChild(line);
    transcript.scrollTop = transcript.scrollHeight;
  };

  socket.onerror = (err) => {
    console.error("WebSocket error", err);
  };
}

export function sendAudioChunk(chunk) {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(chunk);
  }
}

export function closeWebSocket() {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.close();
  }
}

