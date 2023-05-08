package com.a604.memberservice.service;

import com.a604.memberservice.dto.request.LoginRequestDto;
import com.a604.memberservice.dto.request.SignUpRequestDto;
import com.a604.memberservice.dto.response.GetMemberDto;
import com.a604.memberservice.entity.Member;
import io.jsonwebtoken.ExpiredJwtException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Optional;

public interface  AuthService {

    // 로그인
    public Optional<String> checkMember(HttpServletResponse response, LoginRequestDto loginRequestDto);

    // 회원가입
    public boolean writeMember(SignUpRequestDto signUpRequestDto);

    // 토큰 재발급
    String reissueAccessToken(HttpServletRequest request, HttpServletResponse response) throws ExpiredJwtException, NullPointerException;

    void saveRefreshToken(HttpServletResponse response, Member member);

    // 아이디 중복 체크
    public boolean checkIdDuplicate(String memeberId);

    // 닉네임 중복 체크
    public boolean checkNicknameDuplicate(String nickname);

    // 이메일 중복 체크
    public boolean checkEmailDuplicate(String email);

    // SignUpRequestDto to Entity
    default Member toEntity(SignUpRequestDto signUpRequestDto) {
        return Member.builder()
                .memberId(signUpRequestDto.getMemberId())
                .nickname(signUpRequestDto.getNickname())
                .password(signUpRequestDto.getPassword())
                .email(signUpRequestDto.getEmail())
                .build();
    }

    // Entity to GetMemberDto
    default GetMemberDto toDto(Member member) {
        return GetMemberDto.builder()
                .seq(member.getSeq())
                .memberId(member.getMemberId())
                .nickname(member.getNickname())
                .email(member.getEmail())
                .build();
    }

}
