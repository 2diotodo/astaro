package com.a604.memberservice.service.impl;

import com.a604.memberservice.dto.request.LoginRequestDto;
import com.a604.memberservice.dto.request.SignUpRequestDto;
import com.a604.memberservice.entity.Member;
import com.a604.memberservice.repository.MemberRepository;
import com.a604.memberservice.service.AuthService;
import com.a604.memberservice.util.CookieUtil;
import com.a604.memberservice.util.JwtUtil;
import io.jsonwebtoken.ExpiredJwtException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.transaction.Transactional;
import java.util.Optional;
import java.util.regex.Pattern;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final JwtUtil jwtUtil;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final MemberRepository memberRepository;

    @Override
    public Optional<String> checkMember(HttpServletResponse response, LoginRequestDto loginRequestDto) {

        Optional<Member> member = Optional.ofNullable(memberRepository.findByMemberId(loginRequestDto.getMemberId())
                .orElseThrow(() -> new UsernameNotFoundException("가입되지 않은 아이디입니다.")));

        if (!bCryptPasswordEncoder.matches(loginRequestDto.getPassword(), member.get().getPassword()))
            throw new UsernameNotFoundException("비밀번호가 일치하지 않습니다.");

        saveRefreshToken(response, member.get());
        return Optional.ofNullable(jwtUtil.generateAccessToken(member.get()));
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
    public String reissueAccessToken(HttpServletRequest request, HttpServletResponse response) throws ExpiredJwtException, NullPointerException{
        String accessToken = jwtUtil.getAccessTokenFromHttpHeader(request);
        log.info("accessToken : {}", accessToken);
        Member member = memberRepository.findById(jwtUtil.getSubject(accessToken)).orElseThrow();
        log.info("member : {}", member);
        String originRefreshToken = CookieUtil.getCookie(request, "refreshToken").orElseThrow().getValue();
        log.info("originRefreshToken : {}", originRefreshToken);
        jwtUtil.verifyToken(originRefreshToken);
        String newRefreshToken = jwtUtil.generateRefreshToken(member);
        CookieUtil.addCookie(response, "refreshToken", newRefreshToken, 24 * 60 * 60);
        return jwtUtil.generateAccessToken(member);
    }

    @Override
    public void saveRefreshToken(HttpServletResponse response, Member member){
        System.out.println("saveRefreshToken");
        CookieUtil.addCookie(response, "refreshToken", jwtUtil.generateRefreshToken(member), 24 * 60 * 60);
    }

    @Override
    public boolean checkIdDuplicate(String memberId) {
        return memberRepository.existsByMemberId(memberId);
    }

    @Override
    public boolean checkNicknameDuplicate(String nickname) {
        return memberRepository.existsByNickname(nickname);
    }

    @Override
    public boolean checkEmailDuplicate(String email) {
        return memberRepository.existsByEmail(email);
    }
}
