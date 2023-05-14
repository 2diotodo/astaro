package com.a604.boardservice.dto;

import com.a604.boardservice.entity.Message;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class MessageRequestDto {
    private long messageListSeq;
//    private long senderSeq;
//    private long receiverSeq;
    private String originalContent;
    private String filteredContent;
    private long resultSeq;
    private LocalDateTime createdAt;

    public Message toEntity() {
        Message message = Message.builder()
                .messageListSeq(this.messageListSeq)
//                .senderSeq(this.senderSeq)
//                .receiverSeq(this.receiverSeq)
                .originalContent(this.originalContent)
                .filteredContent(this.filteredContent)
                .createdAt(this.createdAt)
                .build();
        return message;
    }
}
