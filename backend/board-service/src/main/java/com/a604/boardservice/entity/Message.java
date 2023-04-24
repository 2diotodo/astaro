package com.a604.boardservice.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Comment;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Comment("쪽지 Seq")
    private int messageSeq;

    // 연결된 entity 추후 수정 필요
    @Column(nullable = false)
    @Comment("message list Seq")
    private int messageListSeq;

    @Column(nullable = false)
    @Comment("sender Seq")
    private int senderSeq;

    @Column(nullable = false)
    @Comment("receiver Seq")
    private int receiverSeq;

    @Column(columnDefinition = "TEXT", nullable = false)
    @Comment("원본 Content")
    private String originalContent;

    @Column(columnDefinition = "TEXT", nullable = false)
    @Comment("필터링된 Content")
    private String filteredContent;

    @CreatedDate
    @Column(updatable = false, nullable = false)
    @Comment("메세지 생성 시각")
    private LocalDateTime createdAt;

    @Column(columnDefinition = "boolean default false", nullable = false)
    @Comment("삭제 여부")
    private Boolean isDeleted;
}
