package com.a604.gatewayserver.filter;

import com.a604.gatewayserver.util.JwtUtil;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.SecurityException;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import reactor.core.publisher.Mono;

import java.nio.charset.StandardCharsets;

// 인증 필터
@Slf4j
@Component
public class JwtAuthenticationFilter extends AbstractGatewayFilterFactory<JwtAuthenticationFilter.Config> {

    // [ Dependency : jwtUtil ]
    private final JwtUtil jwtUtil;

    public JwtAuthenticationFilter(JwtUtil jwtUtil){
        super(Config.class);
        this.jwtUtil = jwtUtil;
    }

    // [ Filter apply : JwtAuthentication ]
    @Override
    public GatewayFilter apply(Config config) {

        return ((exchange, chain) -> {

            ServerHttpRequest request = exchange.getRequest();
            ServerHttpResponse response = exchange.getResponse();

            try {
                String token = jwtUtil.getAccessTokenFromHttpHeader(request);
                log.info("token : {}", token);
                if(token == null){
                    return onError(response, "invalid Token", HttpStatus.UNAUTHORIZED);
                }
                Claims claims = jwtUtil.verifyToken(token);
                addAuthorizationHeaders(request, claims.getSubject(), claims.get("role").toString());
                return chain.filter(exchange);
            } catch (ExpiredJwtException e){
                return onError(response, "expired Token", HttpStatus.UNAUTHORIZED);
            } catch (SecurityException | MalformedJwtException | UnsupportedJwtException | IllegalArgumentException e){
                log.error(e.getMessage());
                return onError(response, "invalid Token", HttpStatus.UNAUTHORIZED);
            }
        });

    }

    // Authorization Success
    private void addAuthorizationHeaders(ServerHttpRequest request, String memeberSeq, String role){
        request.mutate()
                .header("X-Authorization-Role", role)
                .header("X-Authorization-Seq", memeberSeq)
                .build();
    }

    // Authorization Failure : Error Response
    private Mono<Void> onError(ServerHttpResponse response, String message, HttpStatus status){
        response.setStatusCode(status);
        DataBuffer buffer = response.bufferFactory().wrap(message.getBytes(StandardCharsets.UTF_8));
        return response.writeWith(Mono.just(buffer));
    }

    @Setter
    public static class Config {
    }
}
