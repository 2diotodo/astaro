package com.a604.boardservice.repository;

import com.a604.boardservice.entity.TaroResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ShootingStarRepository extends JpaRepository<TaroResult, Long> {
    /**
     * 랜덤 타로 결과 반환, 자기 자신이 작성한 글 제외
     * @param memberSeq
     * @return TaroResult
     */
    @Query(value = "SELECT * FROM taro_result WHERE is_deleted = 0 AND is_public = 1 AND member_seq != :memberSeq ORDER BY RAND() LIMIT 1", nativeQuery = true)
    TaroResult findRandomTaroResult(@Param("memberSeq") long memberSeq);
}
