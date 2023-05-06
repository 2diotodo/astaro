package com.a604.gatewayserver.filter;

import com.a604.gatewayserver.util.JwtUtil;
import lombok.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;

import java.nio.charset.StandardCharsets;

// 인가 필터
@Slf4j
@Component
public class JwtAuthorizationFilter extends AbstractGatewayFilterFactory<JwtAuthorizationFilter.Config> {

    // [ Dependency : jwtUtil ]
    private final JwtUtil jwtUtil;
    public JwtAuthorizationFilter(JwtUtil jwtUtil){
        super(Config.class);
        this.jwtUtil = jwtUtil;
    }

    // [ Filter apply : JwtAuthorization ]
    @Override
    public GatewayFilter apply(Config config) {
        return ((exchange, chain) -> {
            ServerHttpRequest request = exchange.getRequest();
            ServerHttpResponse response = exchange.getResponse();

            String role = "ROLE_" + request.getHeaders().get("X-Authorization-Role").get(0);
            log.info("role : " + role);
            log.info("config : " + config);
            log.info("config.getRole() : " + config.getRole());
            if(role.equals(config.getRole()))
                return chain.filter(exchange);
            else
                return onError(response, "UNATHORIZATION", HttpStatus.FORBIDDEN);

        });
    }

    // Authorization Failure : Error Response
    private Mono<Void> onError(ServerHttpResponse response, String message, HttpStatus status){
        response.setStatusCode(status);
        DataBuffer buffer = response.bufferFactory().wrap(message.getBytes(StandardCharsets.UTF_8));
        return response.writeWith(Mono.just(buffer));
    }

    @Data
    public static class Config {
        private String role;
    }
}
