package com.a604.boardservice.dto;

import com.a604.boardservice.entity.Message;
import lombok.Getter;

@Getter
public class MessageDto {
//    /**
//     * 메시지 발신자 정보
//     */
//    private int senderSeq;
//
//    /**
//     * 메시지 수신자 정보
//     */
//    private int receiverSeq;

    /**
     *필터링 되지 않은 메세지 내용
     */
    private String originalContent;

    /**
     * 필터링 된 메세지 내용
     */
    private String filteredContent;

    public MessageDto(Message message) {
        this.originalContent = message.getOriginalContent();
        this.filteredContent = message.getFilteredContent();
    }
}
