package com.a604.memberservice.controller;

import com.a604.memberservice.dto.request.UpdateRequestDto;
import com.a604.memberservice.dto.response.GetMemberDto;
import com.a604.memberservice.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
public class MemberRestController {

    private final MemberService memberService;

    @GetMapping("/")
    public ResponseEntity<?> validate(){
        return null;
    }

    // 회원 정보 조회
    @GetMapping("/users")
    public ResponseEntity<Map<String, Object>> getUser(HttpServletRequest request) {

        Map<String, Object> result = new HashMap<>();

        Long memberSeq = Long.valueOf(request.getHeaders("X-Authorization-Seq").nextElement());

        GetMemberDto getMemberDto = memberService.getUser(memberSeq);
        result.put("member", getMemberDto);

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    // 회원 프로필 업데이트
    @PutMapping("/update/profile")
    public ResponseEntity<Map<String, String>> updateProfile(HttpServletRequest request, @RequestBody UpdateRequestDto updateRequestDto) {
        Map<String, String> result = new HashMap<>();

        try {
            Long memberSeq = Long.valueOf(request.getHeaders("X-Authorization-Seq").nextElement());
            memberService.modifyProfile(memberSeq, updateRequestDto.getProfile());

            result.put("status", "200");
            result.put("message", "프로필 변경 완료");
            result.put("profile", updateRequestDto.getProfile().toString());
        } catch (Exception e) {
            result.put("status", "200");
            result.put("message", "프로필 변경 실패");
        }

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    // 회원 정보 수정 :
    @PutMapping("/update/memberInfo")
    public ResponseEntity<Map<String, String>> updateMember(HttpServletRequest request, @RequestBody UpdateRequestDto updateRequestDto) {
        Map<String, String> result = new HashMap<>();

        try {
            Long memberSeq = Long.valueOf(request.getHeaders("X-Authorization-Seq").nextElement());
            memberService.modifyMember(memberSeq, updateRequestDto);

            result.put("status", "200");
            result.put("message", "회원정보 수정 완료");
            result.put("nickname", updateRequestDto.getNickname());

        } catch (Exception e) {
            result.put("status", "400");
            result.put("message", "회원정보 수정 실패");
        }
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    // 회원 탈퇴
    @PutMapping("/update/isDeleted")
    public ResponseEntity<Map<String, String>> updateIsDeleted(HttpServletRequest request) {
        Map<String, String> result = new HashMap<>();

        try {
            Long memberSeq = Long.valueOf(request.getHeaders("X-Authorization-Seq").nextElement());
            memberService.removeMember(memberSeq);

            result.put("status", "200");
            result.put("message", "회원탈퇴 완료");
        } catch (Exception e) {
            result.put("status", "500");
            result.put("message", "회원탈퇴 실패");
        }

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

}