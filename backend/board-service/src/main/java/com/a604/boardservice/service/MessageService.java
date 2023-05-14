package com.a604.boardservice.service;

import com.a604.boardservice.dto.MessageRequestDto;
import com.a604.boardservice.dto.MessageResponseDto;
import com.a604.boardservice.entity.Message;

import java.util.List;

/**
 * 메시지 관련 로직 처리를 위한 서비스 인터페이스
 */
public interface MessageService {
    /**
     * 채팅방에 해당하는 메시지 가져오기
     * @param messageListSeq
     * @return
     */
    List<MessageResponseDto> getMessagesByMessageListSeq(long messageListSeq);

    Message sendMessage(MessageRequestDto messageRequestDto, long memberSeq);
}
