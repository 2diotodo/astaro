package com.a604.boardservice.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MessageRequestDto {
    private int messageListSeq;
    private int senderSeq;
    private int receiverSeq;
    private String originalContent;
    private String filteredContent;
}
