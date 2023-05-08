package com.a604.memberservice.service;

import com.a604.memberservice.dto.request.SignUpRequestDto;
import com.a604.memberservice.dto.request.UpdateRequestDto;
import com.a604.memberservice.dto.response.GetMemberDto;
import com.a604.memberservice.entity.Member;

public interface MemberService {

    // 회원 정보 조회 : 본인
    public GetMemberDto getUser(Long memberSeq);

    // 업데이트 : 프로필
    public void modifyProfile(Long memberSeq, Integer profile);

    // 업데이트 : 그 외
    public void modifyMember(Long memberSeq, UpdateRequestDto updateRequestDto);

    // 회원 삭제
    public void removeMember(Long memberSeq);


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
                .memberId(member.getMemberId())
                .nickname(member.getNickname())
                .profile(member.getProfile())
                .lux(member.getLux())
                .heal(member.getHeal())
                .email(member.getEmail())
                .build();

    }

}
