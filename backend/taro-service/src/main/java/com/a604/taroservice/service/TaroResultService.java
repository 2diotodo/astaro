package com.a604.taroservice.service;

import com.a604.taroservice.data.TaroResult;
import com.a604.taroservice.dto.TaroResultDto;
import com.a604.taroservice.repository.TaroResultRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class TaroResultService {
    private final TaroResultRepository taroResultRepository;

    public TaroResultDto saveTaroResult(TaroResultDto dto){
        boolean dangerous = false;
        if(dto.getContentInput().contains("자살")){
            dangerous = true;
        }
        return null;

    }

    public TaroResult dtoToEntity(TaroResultDto dto, boolean dangerous){
        return TaroResult.builder()
                .memberSeq(dto.getMemberSeq())
                .category(dto.getCategory())
                .contentInput(dto.getContentInput())
                .cardSeqList(dto.getSeqList())
                .contentList(dto.getContentList())
                .imgList(dto.getImgList())
                .isDangerous(dangerous)
                .createdAt(LocalDate.now())
                .build();
    }

}
