package com.example.backend.handler;

import com.example.backend.service.TranscriptionService;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.socket.*;
import reactor.core.publisher.Mono;

@Component
public class AudioWebSocketHandler implements WebSocketHandler {

    private final TranscriptionService transcriptionService;

    public AudioWebSocketHandler(TranscriptionService transcriptionService) {
        this.transcriptionService = transcriptionService;
    }

    @Override
    public Mono<Void> handle(WebSocketSession session) {

        return session.receive()
                .filter(msg -> msg.getType() == WebSocketMessage.Type.BINARY)
                .flatMap(msg -> {
                    byte[] audioBytes = new byte[msg.getPayload().readableByteCount()];
                    msg.getPayload().read(audioBytes);

                    return transcriptionService.transcribe(audioBytes)
                            .map(session::textMessage);
                })
                .as(session::send);
    }
}
