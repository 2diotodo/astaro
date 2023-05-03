package com.a604.gatewayserver.filter;

import com.a604.gatewayserver.util.JwtUtil;
import io.jsonwebtoken.Claims;
import lombok.Setter;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;

import java.nio.charset.StandardCharsets;

// 인증 필터
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

            // Request Cookie에서 accessToken을 추출
            String token = jwtUtil.getAccessToken(request);

            // 복호화 및 유효 시간 확인
            try {
                Claims claims = jwtUtil.getClaims(token);

                if(!jwtUtil.isValidToken(claims)){
                    addAuthorizationHeaders(request,claims.get("memberSeq").toString(),claims.get("role").toString());
                    return chain.filter(exchange);
                }else{
                    return onError(response, "invalid Token", HttpStatus.UNAUTHORIZED);
                }

            }catch (Exception e){
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
