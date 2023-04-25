package com.a604.memberservice.controller;

import com.a604.memberservice.dto.request.SignUpMemberDto;
import com.a604.memberservice.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/member")
public class MemberRestController {

    @Autowired
    private MemberService memberService;

    // 회원가입
    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody SignUpMemberDto signUpMemberDto) {

        String result = "성공 ㅎ";


        memberService.writeMember(signUpMemberDto);


        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    // 회원 정보 - 본인
//    @GetMapping("/member/{memberSeq}")
//    public ResponseEntity<Map<String, Object>> getMember(@PathVariable Long memberSeq) {
//        Map<String, Object> result = new HashMap<>();
//
//        result.put("member", memberService.)
//
//    }

    // 아이디 중복 체크
    @GetMapping("exist/id/{memberId}")
    public ResponseEntity<Boolean> checkIdDuplicate(@PathVariable String memberId) {
        return ResponseEntity.ok(memberService.CheckIdDuplicate(memberId));
    }

    // 닉네임 중복 체크
    @GetMapping("exist/nickname/{nickname}")
    public ResponseEntity<Boolean> checkNicknameDuplicate(@PathVariable String nickname) {
        return ResponseEntity.ok(memberService.CheckNicknameDuplicate(nickname));
    }

    // 이메일 중복 체크
    @GetMapping("exist/email/{email}")
    public ResponseEntity<Boolean> checkEmailDuplicate(@PathVariable String email) {
        return ResponseEntity.ok(memberService.CheckEmailDuplicate(email));
    }
}
