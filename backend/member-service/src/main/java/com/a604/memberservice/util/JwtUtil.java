package com.a604.memberservice.util;

import com.a604.memberservice.dto.response.TokenResponseDto;
import com.a604.memberservice.entity.Member;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Date;

@Component
@RequiredArgsConstructor
public class JwtUtil {

    // access token 유효시간
    private final long accessTokenValidTime = 30 * 60 * 1000L;
    // refresh token 유효시간
    private final long refreshTokenValidTime = 24 * 60 * 60 * 1000L;
    // secret key
    @Value("${jwt.secret}")
    private String secret;

    private SecretKey secretKey;

    @PostConstruct
    private void init() {
        this.secret = Base64.getEncoder().encodeToString(secret.getBytes());
        this.secretKey = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }


    /**
     * 토큰 발급
     */
    public TokenResponseDto generateToken(Member member) {

        Date now = new Date();

        Claims accessTokenClaims = Jwts.claims().setSubject("accessToken");
        accessTokenClaims.put("role", member.getRole());

        String accessToken = Jwts.builder()
                .setSubject(member.getMemberSeq().toString())
                .setHeaderParam("alg", SignatureAlgorithm.HS256.getValue())
                .setHeaderParam("typ", "JWT")
                .setClaims(accessTokenClaims)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + accessTokenValidTime))
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();

        Claims refreshTokenClaims = Jwts.claims().setSubject("refreshToken");
        refreshTokenClaims.put("memberSeq", member.getMemberSeq());
        refreshTokenClaims.put("role", member.getRole());

        String refreshToken = Jwts.builder()
                .setHeaderParam("alg", "HS256")
                .setHeaderParam("typ", "JWT")
                .setClaims(accessTokenClaims)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + refreshTokenValidTime))
                .signWith(SignatureAlgorithm.HS256, secretKey)
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

    public String provideAccessToken(Member member){
        Date now = new Date();

        Claims claims = Jwts.claims();
        claims.put("role", member.getRole());

        return Jwts.builder()
                .setSubject(member.getMemberSeq().toString())
                .setHeaderParam("alg", SignatureAlgorithm.HS256.getValue())
                .setHeaderParam("typ", "JWT")
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + accessTokenValidTime))
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }

    public String provideRefreshToken(Member member){
        Date now = new Date();

        Claims claims = Jwts.claims();
        claims.put("role", member.getRole());

        return Jwts.builder()
                .setSubject(member.getMemberSeq().toString())
                .setHeaderParam("alg", "HS256")
                .setHeaderParam("typ", "JWT")
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + refreshTokenValidTime))
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }
    /**
     * 토큰에서 인증 subject 추출
     */
//    public String getSubject(String token) {
//        return getClaimsFormToken(token).getSubject();
//    }

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
