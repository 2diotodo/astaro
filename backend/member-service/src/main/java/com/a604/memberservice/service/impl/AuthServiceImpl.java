package com.a604.memberservice.service.impl;

import com.a604.memberservice.dto.request.LoginRequestDto;
import com.a604.memberservice.dto.request.SignUpRequestDto;
import com.a604.memberservice.dto.response.TokenResponseDto;
import com.a604.memberservice.entity.Member;
import com.a604.memberservice.repository.MemberRepository;
import com.a604.memberservice.service.AuthService;
import com.a604.memberservice.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.servlet.http.Cookie;
import javax.transaction.Transactional;
import java.util.Optional;
import java.util.regex.Pattern;

@Service
@Transactional
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final JwtUtil jwtUtil;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final MemberRepository memberRepository;

    @Override
    public Optional<TokenResponseDto> checkMember(LoginRequestDto loginRequestDto) {

        Optional<Member> member = Optional.ofNullable(memberRepository.findByMemberId(loginRequestDto.getMemberId())
                .orElseThrow(() -> new UsernameNotFoundException("가입되지 않은 아이디입니다.")));

        if (!bCryptPasswordEncoder.matches(loginRequestDto.getPassword(), member.get().getPassword()))
            throw new UsernameNotFoundException("비밀번호가 일치하지 않습니다.");

        return Optional.ofNullable(jwtUtil.generateToken(member.get()));
    }

    @Override
    public boolean writeMember(SignUpRequestDto signUpRequestDto) {

        // STEP 1 : MemberId 중복 검사
        if (checkIdDuplicate(signUpRequestDto.getMemberId()))
            throw new RuntimeException("이미 사용중인 아이디입니다.");

        // STEP 2 : Email 유효성 검사
        if (!Pattern.matches("^[a-z0-9A-Z._-]*@[a-z0-9A-Z]*.[a-zA-Z.]*$", signUpRequestDto.getEmail()))
            throw new RuntimeException("이메일이 유효하지 않습니다.");

        // STEP 3 : PASSWORD 검사
        if (!Pattern.matches("(?=.*\\d{1,50})(?=.*[~`!@#$%\\^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{8,50}$", signUpRequestDto.getPassword()))
            throw new RuntimeException("비밀번호가 안전하지 않습니다.");

        // STEP 4 : Email 중복 검사
        if (checkIdDuplicate(signUpRequestDto.getMemberId()))
            throw new RuntimeException("이미 사용중인 이메일입니다.");

        // STEP 5 : Nickname 중복 검사
        if (checkIdDuplicate(signUpRequestDto.getMemberId()))
            throw new RuntimeException("이미 사용중인 닉네임입니다.");

        // STEP 6 : Password 암호화
        signUpRequestDto.setPassword(bCryptPasswordEncoder.encode(signUpRequestDto.getPassword()));

        // STEP 7 : DB Create Member
        memberRepository.save(toEntity(signUpRequestDto));

        return true;
    }

    @Override
    public TokenResponseDto reissuance(Cookie cookie) {
        return new TokenResponseDto();
    }

    @Override
    public boolean checkIdDuplicate(String memeberId) {
        return false;
    }

    @Override
    public boolean checkNicknameDuplicate(String nickname) {
        return false;
    }

    @Override
    public boolean checkEmailDuplicate(String email) {
        return false;
    }
}
