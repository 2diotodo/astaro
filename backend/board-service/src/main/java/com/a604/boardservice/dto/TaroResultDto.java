package com.a604.boardservice.dto;

import com.a604.boardservice.entity.TaroResult;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TaroResultDto {
    private long seq;
    private long memberSeq;
    private String category;
    private String input;
    private String cardSeqList;
    private String contentList;
    private String imgList;
    private Boolean isDangerous;
    private Boolean isPublic;
    private LocalDateTime createdAt;
    private Boolean isDeleted;

    public TaroResult toEntity() {
        TaroResult taroResult = TaroResult.builder()
                .seq(this.seq)
                .memberSeq(this.memberSeq)
                .category(this.category)
                .input(this.input)
                .cardSeqList(this.cardSeqList)
                .contentList(this.contentList)
                .imgList(this.imgList)
                .isDangerous(this.isDangerous)
                .isPublic(this.isPublic)
                .createdAt(this.createdAt)
                .isDeleted(this.isDeleted)
                .build();
        return taroResult;
    }

    public TaroResultDto(TaroResult taroResult) {
        this.seq = taroResult.getSeq();
        this.memberSeq = taroResult.getMemberSeq();
        this.category = taroResult.getCategory();
        this.input = taroResult.getInput();
        this.cardSeqList = taroResult.getCardSeqList();
        this.contentList = taroResult.getContentList();
        this.imgList = taroResult.getImgList();
        this.isDangerous = taroResult.getIsDangerous();
        this.isPublic = taroResult.getIsPublic();
        this.createdAt = taroResult.getCreatedAt();
        this.isDeleted = taroResult.getIsDeleted();
    }
}
