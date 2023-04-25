package com.a604.boardservice.dto;

import com.a604.boardservice.entity.Message;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class MessageResponseDto {
    /**
     * 발신자 seq
     */
    private long senderSeq;

    /**
     * 수신자 seq
     */
    private long receiverSeq;

    /**
     *필터링 되지 않은 메세지 내용
     */
    private String originalContent;

    /**
     * 필터링 된 메세지 내용
     */
    private String filteredContent;

    /**
     * 채팅 생성 시각
     */
    private LocalDateTime createdAt;

    public MessageResponseDto(Message message) {
        this.senderSeq = message.getSenderSeq();
        this.receiverSeq = message.getReceiverSeq();
        this.originalContent = message.getOriginalContent();
        this.filteredContent = message.getFilteredContent();
        this.createdAt = message.getCreatedAt();
    }
}
