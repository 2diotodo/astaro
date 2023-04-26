package com.a604.memberservice.service;

import com.a604.memberservice.dto.request.SignUpMemberDto;
import com.a604.memberservice.entity.Member;

public interface MemberService {

    //아이디 찾기

//    // 비밀번호 찾기
//
//    // 회원 정보 조회
//    public

    // 아이디 중복 체크
    public boolean CheckIdDuplicate(String memeberId);

    // 닉네임 중복 체크
    public boolean CheckNicknameDuplicate(String nickname);

    // 이메일 중복 체크
    public boolean CheckEmailDuplicate(String email);

    // 회원가입
    public void writeMember(SignUpMemberDto signUpMemberDto);

    // 암호화


    // SignUpMemberDto to Entity
    default Member toEntity(SignUpMemberDto signUpMemberDto) {
        return Member.builder()
                .memberSeq(signUpMemberDto.getMemberSeq())
                .memberId(signUpMemberDto.getMemberId())
                .nickname(signUpMemberDto.getNickname())
                .password(signUpMemberDto.getPassword())
                .email(signUpMemberDto.getEmail())
                .build();
    }
}
