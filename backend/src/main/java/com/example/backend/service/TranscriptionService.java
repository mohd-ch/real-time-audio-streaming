package com.example.backend.service;

import reactor.core.publisher.Flux;

public interface TranscriptionService {

    Flux<String> transcribe(byte[] audioChunk);

}
