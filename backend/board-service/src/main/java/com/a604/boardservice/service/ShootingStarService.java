package com.a604.boardservice.service;

import com.a604.boardservice.dto.TaroResultDto;
import com.a604.boardservice.entity.TaroResult;

public interface ShootingStarService {
    TaroResultDto getTaroResult(long memberSeq, String category);
}
