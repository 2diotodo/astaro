package com.a604.taroservice.dto;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class TodayTaroDto {
    private String cardName;
    private String content;
    private String mainImageUrl;
    private String goodImageUrl;
    private String badImageUrl;
    private String goodCardName;
    private String badCardName;

}
