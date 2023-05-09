package com.a604.memberservice.controller;

import com.a604.memberservice.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
public class MemberRestController {

    private MemberService memberService;

    // 회원 정보 조회
    @GetMapping("/users")
    public ResponseEntity<Map<String, String>> getUser() {

        Map<String, String> result = new HashMap<>();

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    // 회원 프로필 업데이트
    @PutMapping("/update/profile")
    public ResponseEntity<Map<String, String>> updateProfile() {
        Map<String, String> result = new HashMap<>();

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    // 회원 정보 수정 :
    @PutMapping("/update/memberInfo")
    public ResponseEntity<Map<String, String>> updateMember() {
        Map<String, String> result = new HashMap<>();

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    // 회원 탈퇴
    @PutMapping("/update/isDeleted")
    public ResponseEntity<Map<String, String>> updateIsDeleted() {
        Map<String, String> result = new HashMap<>();

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

}