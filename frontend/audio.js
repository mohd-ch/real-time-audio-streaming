import { connectWebSocket, sendAudioChunk } from "./websocket.js";

let audioContext;
let analyser;
let dataArray;
let mediaStream;
let processor;
let isRunning = false;

const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");

startBtn.addEventListener("click", async () => {
    if (isRunning) return;

    connectWebSocket();

    mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });

    audioContext = new AudioContext({ sampleRate: 16000 });
    const source = audioContext.createMediaStreamSource(mediaStream);

    analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;

    dataArray = new Uint8Array(analyser.frequencyBinCount);

    processor = audioContext.createScriptProcessor(4096, 1, 1);

    source.connect(analyser);
    analyser.connect(processor);
    processor.connect(audioContext.destination);

    processor.onaudioprocess = (e) => {
        if (!isRunning) return;

        const input = e.inputBuffer.getChannelData(0);
        const buffer = new Float32Array(input);
        sendAudioChunk(buffer.buffer); // send binary audio
    };

    isRunning = true;
    startBtn.disabled = true;
    stopBtn.disabled = false;

    startVisualizer(analyser, dataArray, () => isRunning);
});

stopBtn.addEventListener("click", () => {
    if (!isRunning) return;

    mediaStream.getTracks().forEach(track => track.stop());
    processor.disconnect();
    audioContext.close();

    isRunning = false;
    startBtn.disabled = false;
    stopBtn.disabled = true;
});
