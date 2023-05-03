package com.a604.memberservice.controller;

import com.a604.memberservice.dto.request.LoginRequestDto;
import com.a604.memberservice.dto.request.SignUpRequestDto;
import com.a604.memberservice.dto.response.TokenResponseDto;
import com.a604.memberservice.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthRestController {


    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody LoginRequestDto loginRequestDto,
                                                     HttpServletResponse response) {

        Map<String, String> result = new HashMap<>();

        try {
            Optional<TokenResponseDto> token = authService.checkMember(loginRequestDto);

            Cookie accessCookie = new Cookie("accessToken", token.get().getAccessToken());
            accessCookie.setHttpOnly(true);
            accessCookie.setSecure(true);
            accessCookie.setMaxAge(30 * 60); // 30분
            accessCookie.setPath("/");
            accessCookie.setDomain("localhost");

            Cookie refreshCookie = new Cookie("refreshToken", token.get().getRefreshToken());
            refreshCookie.setHttpOnly(true);
            refreshCookie.setSecure(true);
            refreshCookie.setMaxAge(24 * 60 * 60); // 24시간
            refreshCookie.setPath("/");
            refreshCookie.setDomain("localhost");

            response.addCookie(accessCookie);
            response.addCookie(refreshCookie);

            result.put("message", "로그인 성공");
            result.put("status", "200");

            return new ResponseEntity<>(result, HttpStatus.OK);

        } catch (UsernameNotFoundException e) {
            result.put("status", "403");
            result.put("message", e.getMessage());
            return new ResponseEntity<>(result, HttpStatus.FORBIDDEN);
        }

    }

    @PostMapping("/signup")
    public ResponseEntity<Map<String, String>> signup(@RequestBody SignUpRequestDto signUpRequestDto) {

        Map<String, String> result = new HashMap<>();

        authService.writeMember(signUpRequestDto);

        result.put("message", "회원가입 성공");
        result.put("status", "200");

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PostMapping("/logout")
    public ResponseEntity<Map<String, String>> logout(HttpServletResponse response) {

        Map<String, String> result = new HashMap<>();

        Cookie accessCookie = new Cookie("accessToken", null);
        accessCookie.setHttpOnly(true);
        accessCookie.setSecure(true);
        accessCookie.setMaxAge(0);
        accessCookie.setPath("/");
        accessCookie.setDomain("localhost");

        Cookie refreshCookie = new Cookie("refreshToken", null);
        refreshCookie.setHttpOnly(true);
        refreshCookie.setSecure(true);
        refreshCookie.setMaxAge(0);
        refreshCookie.setPath("/");
        refreshCookie.setDomain("localhost");

        response.addCookie(accessCookie);
        response.addCookie(refreshCookie);

        result.put("message", "로그아웃 성공");
        result.put("status", "200");

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PostMapping("/reissuance")
    public ResponseEntity<Map<String, String>> reissuance(HttpServletRequest request, HttpServletResponse response) {

        Map<String, String> result = new HashMap<>();

        if (request.getCookies() != null) {

            for (Cookie cookie : request.getCookies()) {
                if (cookie.getName().equals("refreshToken")) {
                    TokenResponseDto token = authService.reissuance(cookie.getValue());

                    Cookie accessCookie = new Cookie("accessToken", token.getAccessToken());
                    accessCookie.setHttpOnly(true);
                    accessCookie.setSecure(true);
                    accessCookie.setMaxAge(30 * 60); // 30분
                    accessCookie.setPath("/");
                    accessCookie.setDomain("localhost");

                    Cookie refreshCookie = new Cookie("refreshToken", token.getRefreshToken());
                    refreshCookie.setHttpOnly(true);
                    refreshCookie.setSecure(true);
                    refreshCookie.setMaxAge(24 * 60 * 60); // 24시간
                    refreshCookie.setPath("/");
                    refreshCookie.setDomain("localhost");

                    response.addCookie(accessCookie);
                    response.addCookie(refreshCookie);

                    result.put("message", "토큰 재발급 성공");
                    result.put("status", "200");

                    return new ResponseEntity<>(result, HttpStatus.OK);
                }
            }

        }

        result.put("message", "토큰 재발급 실패");
        result.put("status", "401");

        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    // 아이디 중복 체크
    @GetMapping("check/id/{memberId}")
    public ResponseEntity<Map<String, String>> checkAvailableId(@PathVariable String memberId) {

        Map<String, String> result = new HashMap<>();

        if (authService.checkIdDuplicate(memberId)) {
            result.put("message", "이미 사용중인 ID입니다.");
            result.put("status", "409");

            return new ResponseEntity<>(result, HttpStatus.CONFLICT);
        }

        result.put("message", "사용 가능한 ID 입니다.");
        result.put("status", "200");

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    // 닉네임 중복 체크
    @GetMapping("check/nickname/{nickname}")
    public ResponseEntity<Map<String, String>> checkAvailableNickname(@PathVariable String nickname) {

        Map<String, String> result = new HashMap<>();

        if (authService.checkIdDuplicate(nickname)) {
            result.put("message", "이미 사용중인 닉네임입니다.");
            result.put("status", "409");

            return new ResponseEntity<>(result, HttpStatus.CONFLICT);
        }

        result.put("message", "사용 가능한 닉네임입니다.");
        result.put("status", "200");

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    // 이메일 중복 체크
    @GetMapping("check/email/{email}")
    public ResponseEntity<Map<String, String>> checkAvailableEmail(@PathVariable String email) {

        Map<String, String> result = new HashMap<>();

        if (authService.checkIdDuplicate(email)) {
            result.put("message", "이미 사용중인 닉네임입니다.");
            result.put("status", "409");

            return new ResponseEntity<>(result, HttpStatus.CONFLICT);
        }

        result.put("message", "사용 가능한 닉네임입니다.");
        result.put("status", "200");

        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
