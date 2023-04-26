package com.a604.memberservice.service.impl;

import com.a604.memberservice.dto.request.SignUpMemberDto;
import com.a604.memberservice.repository.MemberRepository;
import com.a604.memberservice.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class MemberServiceImpl implements MemberService {

    @Autowired
    private MemberRepository memberRepository;

    @Override
    public boolean CheckIdDuplicate(String memberId) {
        return memberRepository.existsByMemberId(memberId);
    }

    @Override
    public boolean CheckNicknameDuplicate(String nickname) {
        return memberRepository.existsByNickname(nickname);
    }

    @Override
    public boolean CheckEmailDuplicate(String email) {
        return memberRepository.existsByEmail(email);
    }


    @Override
    public void writeMember(SignUpMemberDto signUpMemberDto) {
        memberRepository.save(toEntity(signUpMemberDto));
    }

}
