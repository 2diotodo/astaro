package com.a604.boardservice.repository;

import com.a604.boardservice.entity.TaroResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.RequestParam;

public interface ShootingStarRepository extends JpaRepository<TaroResult, Long> {
    @Query(value = "SELECT * FROM taro_result WHERE is_deleted = 0 AND is_public = 1 AND member_seq != :memberSeq AND category = :category ORDER BY RAND() LIMIT 1", nativeQuery = true)
    TaroResult findRandomTaroResult(@Param("memberSeq") long memberSeq, @Param("category") String category);

    TaroResult findBySeq(Long seq);

}
