package com.example.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.config.EnableWebFlux;
import org.springframework.web.reactive.socket.server.support.WebSocketHandlerAdapter;
import org.springframework.context.annotation.Bean;

@Configuration
@EnableWebFlux
public class WebSocketConfig {

    @Bean
    public WebSocketHandlerAdapter webSocketHandlerAdapter() {
        return new WebSocketHandlerAdapter();
    }
}
