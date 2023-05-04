package com.a604.memberservice.repository;

import com.a604.memberservice.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {

    @Query(nativeQuery = true, value = "select * from `member`" + "where is_deleted = 0")
    List<Member> findAllMember();

    @Query(nativeQuery = true, value = "select * from `member`" + "where member_id = :memberId and is_deleted = 0")
    Optional<Member> findByMemberId(@Param("memberId") String memberId);

    boolean existsByMemberId(String memberId);

    boolean existsByNickname(String nickname);

    boolean existsByEmail(String email);

    Optional<Member> findByEmail(String email);
}
