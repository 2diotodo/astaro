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
        short randomCardSeq = (short) (MIN_CARD_SEQ + (short)(Math.random() * (MAX_CARD_SEQ - MIN_CARD_SEQ) + MIN_CARD_SEQ));
        CardInfo cardInfo = cardInfoRepository.findCardInfoBySeq(randomCardSeq);
        List<TaroContent> taroContents = taroContentRepository.findTaroContentsByCardSeq(cardInfo.getSeq());
        short randomContentSeq = (short) (MIN_CARD_SEQ + (short)(Math.random() * taroContents.size()-1));
        TaroContent taroContent = taroContents.get(randomContentSeq);
        CardInfo goodCardInfo = cardInfoRepository.findCardInfoBySeq(cardInfo.getGood());
        CardInfo badCardInfo = cardInfoRepository.findCardInfoBySeq(cardInfo.getBad());
        return new TodayTaroDto(cardInfo.getName(), taroContent.getContent(), cardInfo.getImageUrl(), goodCardInfo.getImageUrl(), badCardInfo.getImageUrl(), goodCardInfo.getName(), badCardInfo.getName());
    }
}
