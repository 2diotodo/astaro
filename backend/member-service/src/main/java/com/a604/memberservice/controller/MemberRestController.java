package com.a604.memberservice.controller;

import com.a604.memberservice.dto.request.SignUpMemberDto;
import com.a604.memberservice.dto.request.LoginRequestDto;
import com.a604.memberservice.dto.response.GetMemberDto;
import com.a604.memberservice.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/member")
@CrossOrigin("http://localhost:3000")
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

    // 로그인
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody GetMemberDto getMemberDto){
        Map<String, Object> result = new HashMap<>();
        try {
            GetMemberDto checkMemberDto = memberService.getMember(getMemberDto.getMemberId()).orElseThrow(() -> new NoSuchElementException("data is null"));
            if(checkMemberDto.getPassword().equals(getMemberDto.getPassword())){
                result.put("data", checkMemberDto);
                result.put("message", "로그인 SUCCESS");
            }
            else{
                result.put("message", "비밀번호 INCORRECT");
                return new ResponseEntity<>(result, HttpStatus.EXPECTATION_FAILED);
            }

        } catch (NoSuchElementException e){
            result.put("message", "아이디 INCORRECT");
            return new ResponseEntity<>(result, HttpStatus.EXPECTATION_FAILED);
        }
        return new ResponseEntity<>(result, HttpStatus.OK);


    }

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
