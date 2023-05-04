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

    private Long seq;
    private String memberId;
    private String password;
    private String nickname;
    private String email;
}
