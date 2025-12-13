package com.example.backend.service;

import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

import java.time.Duration;

@Service
public class MockTranscriptionService implements TranscriptionService {

    @Override
    public Flux<String> transcribe(byte[] audioChunk) {

        // Simulate streaming partial transcription
        return Flux.just(
               "Hello...",
        "Hello this is a",
        "Hello this is a real-time",
        "Hello this is a real-time transcription demo"
    ).delayElements(Duration.ofMillis(350));
    }
}
