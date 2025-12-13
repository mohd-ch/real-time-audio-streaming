package com.example.backend.router;

import com.example.backend.handler.AudioWebSocketHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.HandlerMapping;
import org.springframework.web.reactive.handler.SimpleUrlHandlerMapping;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class WebSocketRouter {

    @Bean
    public HandlerMapping webSocketHandlerMapping(AudioWebSocketHandler handler) {

        Map<String, Object> map = new HashMap<>();
        map.put("/audio-stream", handler);

        SimpleUrlHandlerMapping mapping = new SimpleUrlHandlerMapping();
        mapping.setUrlMap(map);
        mapping.setOrder(1);

        return mapping;
    }
}
