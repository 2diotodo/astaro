package com.a604.gatewayserver.util;


import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.apache.http.HttpHeaders;
import org.springframework.http.HttpCookie;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.util.MultiValueMap;

import javax.annotation.PostConstruct;
import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Date;

@Component
public class JwtUtil {

    private String secret = "VlwEyVBsYt9V7zq57TejMnVUyzblYcfPQye08f7MGVA9XkHa";
    private SecretKey secretKey;

    @PostConstruct
    public void init() {
        var secret = Base64.getEncoder().encodeToString(this.secret.getBytes());
        this.secretKey = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }

    // 토큰 추출
    private String extractToken(ServerHttpRequest request) {
        return request.getHeaders().getOrEmpty(HttpHeaders.AUTHORIZATION).get(0);
    }

    // 권한 추출
    private String getRole(String token) {
        return "";
    }


    // 유효성 검사
    public boolean isValidToken(Claims claims){

        System.out.println(claims.getExpiration().toString());
        System.out.println(!claims.getExpiration().before(new Date()));


        return claims.getExpiration().before(new Date());
    }

    // 복호화
    public Claims getClaims(String token) {
        return Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(token).getBody();
    }


    // 토큰 추출
    public String getAccessToken(ServerHttpRequest request) {

        final MultiValueMap<String, HttpCookie> cookies = request.getCookies();

        if(cookies.isEmpty()) return null;

        return cookies.getFirst("accessToken").getValue();

    }


}

