package com.a604.boardservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.a604.boardservice.entity.Member;

public interface MemberRepository extends JpaRepository<Member, Long> {
}
