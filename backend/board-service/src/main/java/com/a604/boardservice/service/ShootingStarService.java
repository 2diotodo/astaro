package com.a604.boardservice.service;

import com.a604.boardservice.dto.TaroResultDto;
import com.a604.boardservice.entity.TaroResult;

public interface ShootingStarService {
    // 랜덤 타로 결과 반환
    TaroResultDto getTaroResult(long memberSeq);
}
