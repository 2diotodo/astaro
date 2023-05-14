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

    @Override
    public TaroResultDto getTaroResult(long memberSeq, String category) {
        TaroResult randomTaroResult = shootingStarRepository.findRandomTaroResult(memberSeq, category);
        if (randomTaroResult == null) {
            return new TaroResultDto();
        } else {
            TaroResultDto taroResultDto = randomTaroResult.toDto();
            return taroResultDto;
        }
    }
}
