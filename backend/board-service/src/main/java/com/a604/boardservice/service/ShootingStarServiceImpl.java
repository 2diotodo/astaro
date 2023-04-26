package com.a604.boardservice.service;

import com.a604.boardservice.dto.TaroResultDto;
import com.a604.boardservice.entity.TaroResult;
import com.a604.boardservice.repository.ShootingStarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ShootingStarServiceImpl implements ShootingStarService{
    @Autowired
    ShootingStarRepository shootingStarRepository;

    /**
     * 랜덤 타로 결과 반환
     * @param memberSeq
     * @return TaroResultDto
     */
    @Override
    public TaroResultDto getTaroResult(long memberSeq) {
        TaroResult randomTaroResult = shootingStarRepository.findRandomTaroResult(memberSeq);
        // 해당하는 타로 결과가 없는 경우
        if (randomTaroResult == null) {
            return new TaroResultDto();
        } else {
            TaroResultDto taroResultDto = new TaroResultDto(randomTaroResult);
            return taroResultDto;
        }
    }
}
