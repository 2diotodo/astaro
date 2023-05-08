package com.a604.boardservice.dto;

import com.a604.boardservice.entity.Message;
import lombok.*;

import java.time.LocalDateTime;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MessageResponseDto {
    /**
     * message sequence
     */
    private long seq;
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

    // 추가된 nickname 필드
    private String nickname;

    public MessageResponseDto(Message message, String nickname) {
        this.seq = message.getSeq();
        this.senderSeq = message.getSenderSeq();
        this.receiverSeq = message.getReceiverSeq();
        this.originalContent = message.getOriginalContent();
        this.filteredContent = message.getFilteredContent();
        this.createdAt = message.getCreatedAt();
        this.nickname = nickname; // 매개변수로 받은 nickname 값을 설정
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public long getSeq() {
        return seq;
    }

    public void setSeq(long seq) {
        this.seq = seq;
    }

    public String getNickname() {
        return nickname;
    }
}
