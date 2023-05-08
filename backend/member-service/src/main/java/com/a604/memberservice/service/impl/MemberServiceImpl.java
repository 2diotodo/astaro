package com.a604.memberservice.service.impl;

import com.a604.memberservice.dto.request.UpdateRequestDto;
import com.a604.memberservice.dto.response.GetMemberDto;
import com.a604.memberservice.entity.Member;
import com.a604.memberservice.repository.MemberRepository;
import com.a604.memberservice.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.regex.Pattern;

@Service
@Transactional
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    // 회원 정보 조회 : 본인
    @Override
    public GetMemberDto getUser(Long memberSeq) {
        return toDto(memberRepository.findBySeq(memberSeq).orElseThrow());
    }

    // 업데이트 : 프로필
    @Override
    public void modifyProfile(Long memberSeq, Integer profile) {

        Member member = memberRepository.findBySeq(memberSeq).orElseThrow();
        member.updateProfile(profile);

        memberRepository.save(member);
    }

    // 업데이트 : 그 외
    @Override
    public void modifyMember(Long memberSeq, UpdateRequestDto updateRequestDto) {
        
        if (memberRepository.existsByNickname(updateRequestDto.getNickname())) {
            throw new RuntimeException("이미 사용중인 닉네임입니다.");
        }

        if (!Pattern.matches("(?=.*\\d{1,50})(?=.*[~`!@#$%\\^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{8,50}$", updateRequestDto.getPassword())) {
            throw new RuntimeException("비밀번호가 안전하지 않습니다.");
        }

        Member member = memberRepository.findBySeq(memberSeq).orElseThrow();
        member.updateMember(updateRequestDto.getNickname(), bCryptPasswordEncoder.encode(updateRequestDto.getPassword()));

        memberRepository.save(member);
    }

    // 회원 삭제
    @Override
    public void removeMember(Long memberSeq) {

        Member member = memberRepository.findBySeq(memberSeq).orElseThrow();
        member.updateIsDeleted(!member.isDeleted());

        memberRepository.save(member);
    }


}
