🎧 Real-Time Audio Streaming & Transcription

A full-stack application demonstrating real-time audio processing, circular audio visualization, and low-latency streaming transcription using modern web and backend technologies.

What This Project Does

Captures microphone audio using MediaStream API

Visualizes live frequency data as a custom circular audio equalizer

Streams audio chunks in real time using WebSockets

Processes audio reactively on the backend

Streams partial transcription results back instantly

Designed with performance, clarity, and extensibility in mind.

High-Level Architecture
Frontend (Browser)
- MediaStream API
- Web Audio API (AnalyserNode)
- Canvas (Circular Visualizer)
- WebSocket (Audio Chunks)

Backend (Spring Boot + WebFlux)
- Reactive WebSocket handling
- Non-blocking stream processing
- Transcription Service (Mock)

Frontend Highlights

Custom circular audio visualizer rendered with Canvas

Smooth animation using requestAnimationFrame (~60 FPS)

Instant reaction to volume and frequency changes

Clean, minimal UI with start/stop controls

Backend Highlights

Built with Spring Boot + WebFlux

Uses WebSockets for bi-directional streaming

Handles small continuous audio chunks without buffering

Streams partial transcription responses in real time

Uses a mock transcription service to demonstrate streaming behavior
(designed to be easily replaceable with Gemini API)

Tech Stack

Frontend:
HTML, CSS, JavaScript, Web Audio API, Canvas, WebSockets

Backend:
Java, Spring Boot, Spring WebFlux, WebSockets

Deployment:
Frontend – GitHub Pages
Backend – Dockerized Spring Boot app (Render)

Notes

Mock transcription is used to avoid external API dependency during evaluation

Architecture supports easy integration of real STT providers (e.g., Gemini)

Focused on real-time flow and clean separation of concerns
