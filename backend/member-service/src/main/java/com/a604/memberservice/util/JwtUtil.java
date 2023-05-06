package com.a604.memberservice.util;

import com.a604.memberservice.dto.response.TokenResponseDto;
import com.a604.memberservice.entity.Member;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SecurityException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.http.HttpHeaders;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.crypto.SecretKey;
import javax.servlet.http.HttpServletRequest;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Date;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtUtil {

    // access token 유효시간
//    private final long accessTokenValidTime = 30 * 60 * 1000L;
    private final long accessTokenValidTime = 2 * 1000L;
    // refresh token 유효시간
    private final long refreshTokenValidTime = 24 * 60 * 60 * 1000L;
    // secret key
    @Value("${jwt.secret}")
    private String secret;
    private SecretKey secretKey;
    private final static String TOKEN_PREFIX = "Bearer ";

    @PostConstruct
    private void init() {
        this.secret = Base64.getEncoder().encodeToString(secret.getBytes());
        this.secretKey = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }

    public String getAccessTokenFromHttpHeader(HttpServletRequest request) {
        String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        if(authHeader.isEmpty()){
            return null;
        }
        if (authHeader.startsWith(TOKEN_PREFIX)) {
            return authHeader.substring(TOKEN_PREFIX.length());
        }
        return null;
    }

    /**
     * 토큰 발급
     */
    public TokenResponseDto generateToken(Member member) {

        Date now = new Date();

        Claims accessTokenClaims = Jwts.claims().setSubject("accessToken");
        accessTokenClaims.put("memberSeq", member.getSeq());
        accessTokenClaims.put("role", member.getRole());

        String accessToken = Jwts.builder()
                .setSubject(member.getSeq().toString())
                .setHeaderParam("alg", SignatureAlgorithm.HS256.getValue())
                .setHeaderParam("typ", "JWT")
                .setClaims(accessTokenClaims)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + accessTokenValidTime))
                .signWith(secretKey, SignatureAlgorithm.HS256)
                .compact();

        Claims refreshTokenClaims = Jwts.claims().setSubject("refreshToken");
        refreshTokenClaims.put("memberSeq", member.getSeq());
        refreshTokenClaims.put("role", member.getRole());

        String refreshToken = Jwts.builder()
                .setHeaderParam("alg", "HS256")
                .setHeaderParam("typ", "JWT")
                .setClaims(accessTokenClaims)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + refreshTokenValidTime))
                .signWith(secretKey, SignatureAlgorithm.HS256)
                .compact();

        return TokenResponseDto.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
    }

    /**
     * 토큰에서 Claim 추출
     */
    public Claims getClaimsFromToken(String token) {
        return Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(token).getBody();
    }

    public String generateAccessToken(Member member){
        Date now = new Date();

        Claims claims = Jwts.claims();
        claims.put("role", member.getRole());

        return Jwts.builder()
                .setSubject(member.getSeq().toString())
                .setHeaderParam("alg", SignatureAlgorithm.HS256.getValue())
                .setHeaderParam("typ", "JWT")
                .setClaims(claims)
                .setExpiration(new Date(now.getTime() + accessTokenValidTime))
                .signWith(secretKey, SignatureAlgorithm.HS256)
                .compact();
    }

    public String generateRefreshToken(Member member){
        Date now = new Date();

        Claims claims = Jwts.claims();
        claims.put("role", member.getRole());

        return Jwts.builder()
                .setSubject(member.getSeq().toString())
                .setHeaderParam("alg", "HS256")
                .setHeaderParam("typ", "JWT")
                .setClaims(claims)
                .setExpiration(new Date(now.getTime() + refreshTokenValidTime))
                .signWith(secretKey, SignatureAlgorithm.HS256)
                .compact();
    }

    public void verifyToken(String token) {
        try {
            Jwts.parserBuilder()
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

    /**
     * 토큰에서 인증 정보 추출
     */
//    public Authentication getAuthentication(String token) {
//        UserDetails userDetails = userDetailsService.loadUserByUsername(this.getSubject(token));
//        return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
//    }

    /**
     * 토큰 검증
     */
//    public boolean isValidToken(String token) {
//        try {
//            Claims claims = getClaimsFormToken(token);
//            System.out.println(claims.get("userSeq"));
//            System.out.println(claims.get("userSeq").getClass());
//            return !claims.getExpiration().before(new Date());
//        } catch (JwtException | NullPointerException exception) {
//            return false;
//        }
//    }

    /**
     *
     */
//    public Long getUserSeq(String accessToken){
//        return Long.valueOf(getClaimsFormToken(accessToken).get("userSeq").toString());
//    }

}
