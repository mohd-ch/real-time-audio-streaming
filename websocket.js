let socket;

export function connectWebSocket() {
    socket = new WebSocket(
        "wss://real-time-audio-streaming.onrender.com/audio-stream"
    );

    socket.onopen = () => {
        console.log("WebSocket connected");
    };

    socket.onmessage = (event) => {
        const output = document.getElementById("transcript");
        output.innerHTML += `<div>${event.data}</div>`;
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

