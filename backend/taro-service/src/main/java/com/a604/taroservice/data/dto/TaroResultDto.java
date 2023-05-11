package com.a604.taroservice.data.dto;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class TaroResultDto {
    private Long memberSeq;
    private String category;
    private String contentInput;
    private String cardSeqList;
    private String contentList;
    private String imgUrl;
    private String videoUrl;
    private String story;
}
