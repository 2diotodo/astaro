package com.a604.memberservice.util;

import com.a604.memberservice.entity.Member;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SecurityException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.security.Key;
import java.util.Base64;
import java.util.Date;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtUtil {

    private final long ACCESS_TOKEN_VALID_TIME = 30 * 60 * 1000L;
//    private final long ACCESS_TOKEN_VALID_TIME = 1 * 1000L;
    private final long REFRESH_TOKEN_VALID_TIME = 24 * 60 * 60 * 1000L;
//    private final long REFRESH_TOKEN_VALID_TIME = 2 * 1000L;
    // secret key
    @Value("${jwt.secret}")
    private String secret;
    private Key secretKey;

    @PostConstruct
    private void init() {
        String encodedSecret = Base64.getEncoder().encodeToString(secret.getBytes());
        this.secretKey = Keys.hmacShaKeyFor(encodedSecret.getBytes());
    }

    public String generateAccessToken(Member member){
        Date now = new Date();
        return Jwts.builder()
                .setHeaderParam("typ", "JWT")
                .setSubject(member.getSeq().toString())
                .claim("role", "USER")
                .signWith(secretKey, SignatureAlgorithm.HS256)
                .setExpiration(new Date(now.getTime() + ACCESS_TOKEN_VALID_TIME))
                .compact();
    }

    public String generateRefreshToken(Member member){
        Date now = new Date();
        return Jwts.builder()
                .setHeaderParam("typ", "JWT")
                .setSubject(member.getSeq().toString())
                .claim("role", "USER")
                .signWith(secretKey, SignatureAlgorithm.HS256)
                .setExpiration(new Date(now.getTime() + REFRESH_TOKEN_VALID_TIME))
                .compact();
    }

    public Claims verifyToken(String token) {
        try {
            return Jwts.parserBuilder()
                    .setSigningKey(secretKey)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
        } catch (ExpiredJwtException e) {
            log.warn(e.toString());
            throw e;// Token is valid and not expired
        } catch (SecurityException | MalformedJwtException | UnsupportedJwtException | IllegalArgumentException e) {
            log.warn(e.toString());
            throw e;
        }
    }
    /**
     * 토큰에서 인증 subject 추출
     */
    public Long getSubject(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .getBody();
        return Long.parseLong(claims.getSubject());
    }

    public Claims getClaim(String token){
        return Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

}
