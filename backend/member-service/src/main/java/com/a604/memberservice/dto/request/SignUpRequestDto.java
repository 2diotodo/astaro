package com.a604.memberservice.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SignUpRequestDto {

    private Long seq;
    private String memberId;
    private String password;
    private String nickname;
    private String email;
}
