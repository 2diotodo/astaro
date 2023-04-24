package com.a604.taroservice.service;

import com.a604.taroservice.data.CardInfo;
import com.a604.taroservice.data.TaroContent;
import com.a604.taroservice.dto.TodayTaroDto;
import com.a604.taroservice.repository.CardInfoRepository;
import com.a604.taroservice.repository.TaroContentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TodayTaroService {

    private final CardInfoRepository cardInfoRepository;
    private final TaroContentRepository taroContentRepository;

    public static final short MIN_CARD_SEQ = 1;
    public static final short MAX_CARD_SEQ = 22;
    public TodayTaroDto todayTaro(){
        short randomCardSeq = (short) (MIN_CARD_SEQ + (short)(Math.random() * (MAX_CARD_SEQ - MIN_CARD_SEQ)));
        System.out.println(randomCardSeq);
        CardInfo cardInfo = cardInfoRepository.findCardInfoBySeq(randomCardSeq);
        System.out.println(cardInfo);
        short cardSeq = cardInfo.getSeq();
        List<TaroContent> taroContents = taroContentRepository.findTaroContentsByCardSeq(cardSeq);
        short randomContentSeq = (short) (MIN_CARD_SEQ + (short)(Math.random() * taroContents.size()));
        TaroContent taroContent = taroContents.get(randomContentSeq);
        TodayTaroDto todayTaroDto = new TodayTaroDto(cardInfo.getName(), taroContent.getContent(), cardInfo.getImageUrl(), cardInfo.getGood(), cardInfo.getBad());
        return todayTaroDto;
    }
}
