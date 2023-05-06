package com.a604.memberservice.controller;

import com.a604.memberservice.dto.request.LoginRequestDto;
import com.a604.memberservice.dto.request.SignUpRequestDto;
import com.a604.memberservice.service.AuthService;
import com.a604.memberservice.util.CookieUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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

@Slf4j
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthRestController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody LoginRequestDto loginRequestDto,
                                                     HttpServletResponse response) {
        Map<String, String> result = new HashMap<>();
        Optional<String> accessToken;
        try {
            accessToken = authService.checkMember(response, loginRequestDto);
        } catch (UsernameNotFoundException e) {
            result.put("message", e.getMessage());
            return new ResponseEntity<>(result, HttpStatus.FORBIDDEN);
        }
        result.put("accessToken", accessToken.orElseThrow());
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PostMapping("/signup")
    public ResponseEntity<Map<String, String>> signup(@RequestBody SignUpRequestDto signUpRequestDto) {
        Map<String, String> result = new HashMap<>();
        authService.writeMember(signUpRequestDto);
        result.put("message", "회원가입 성공");
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

    @PostMapping("/refresh")
    public ResponseEntity<Map<String, String>> refresh(HttpServletRequest request, HttpServletResponse response) {
        log.info(request.getRequestURI());
        log.info("refresh token : " + CookieUtil.getCookie(request, "refreshToken").get());
        String newAccessToken;
        try {
            newAccessToken = authService.reissueAccessToken(request, response);
        } catch (Exception e){
            log.error(e.getMessage());
            return new ResponseEntity<>(new HashMap<>(), HttpStatus.FORBIDDEN);
        }
        Map<String, String> result = new HashMap<>();
        result.put("accessToken", newAccessToken);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    // 아이디 중복 체크
    @GetMapping("/check/id/{memberId}")
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
            result.put("message", "이미 사용중인 이메일입니다.");
            result.put("status", "409");

            return new ResponseEntity<>(result, HttpStatus.CONFLICT);
        }

        result.put("message", "사용 가능한 이메일입니다.");
        result.put("status", "200");

        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
