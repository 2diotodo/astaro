package com.a604.taroservice.dto;

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
    private String seqList;
    private String contentList;
    private String imgList;
}
