package com.a604.memberservice.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class GetMemberDto {

    private String memberId;
    private String nickname;
    private Integer profile;
    private Integer lux;
    private Integer heal;
    private String email;
}
