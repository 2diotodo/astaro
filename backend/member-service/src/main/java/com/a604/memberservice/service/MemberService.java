package com.a604.memberservice.service;

import com.a604.memberservice.dto.request.SignUpRequestDto;
import com.a604.memberservice.dto.response.GetMemberDto;
import com.a604.memberservice.entity.Member;

import java.util.Optional;

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
    public void writeMember(SignUpRequestDto signUpRequestDto);

    // 암호화


    // 로그인
    public Optional<GetMemberDto> getMember(String memberId);

    // SignUpRequestDto to Entity
    default Member toEntity(SignUpRequestDto signUpRequestDto) {
        return Member.builder()
                .memberId(signUpRequestDto.getMemberId())
                .nickname(signUpRequestDto.getNickname())
                .password(signUpRequestDto.getPassword())
                .email(signUpRequestDto.getEmail())
                .role("USER")
                .build();
    }

    default GetMemberDto toDto(Member member) {
        return GetMemberDto.builder()
                .seq(member.getSeq())
                .memberId(member.getMemberId())
                .password(member.getPassword())
                .nickname(member.getNickname())
                .email(member.getEmail())
                .build();

    }

}
