import { connectWebSocket, sendAudioChunk, closeWebSocket } from "./websocket.js";
import { startVisualizer } from "./visualizer.js";

const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const canvas = document.getElementById("visualizer");

let audioContext, analyser, processor, stream;

startBtn.onclick = async () => {
  startBtn.disabled = true;
  stopBtn.disabled = false;

  connectWebSocket();

  stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  audioContext = new AudioContext();

  analyser = audioContext.createAnalyser();
  const source = audioContext.createMediaStreamSource(stream);

  source.connect(analyser);
  analyser.connect(audioContext.destination);

  startVisualizer(analyser, canvas);

  processor = audioContext.createScriptProcessor(16384, 1, 1);
  source.connect(processor);
  processor.connect(audioContext.destination);

  processor.onaudioprocess = (e) => {
    const input = e.inputBuffer.getChannelData(0);
    sendAudioChunk(new Float32Array(input).buffer);
  };
};

stopBtn.onclick = () => {
  startBtn.disabled = false;
  stopBtn.disabled = true;

  processor?.disconnect();
  analyser?.disconnect();
  audioContext?.close();
  stream?.getTracks().forEach(t => t.stop());
  closeWebSocket();
};
