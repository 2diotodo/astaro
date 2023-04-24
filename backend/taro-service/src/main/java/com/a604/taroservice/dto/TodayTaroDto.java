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
    private String imageUrl;
    private short good;
    private short bad;

}
