package com.a604.memberservice.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "member")
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@DynamicInsert
@DynamicUpdate
public class Member {

    @Id
    @Column(name = "member_seq")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberSeq;

    @Column(name = "member_id")
    private String memberId;

    @Column(name = "password")
    private String password;

    @Column(name = "nickname")
    private String nickname;

    @Column(name = "email")
    private String email;

    @Column(name = "role")
    private String role;

    @Column(name = "profile")
    private Integer profile;

    @Column(name = "lux")
    private Integer lux;

    @Column(name = "heal")
    private Integer heal;

    @Column(name = "is_banned")
    private boolean isBanned;

    @Column(name = "ban_exp")
    private LocalDateTime banExp;

    @Column(name = "is_valid")
    private boolean isValid;

    @Column(name = "fword_cnt")
    private Integer fwordCnt;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;


    public void updateMember(String nickname, String password) {
        this.nickname = nickname;
        this.password = password;
    }

    public void updateLux(Integer lux) {
        this.lux = lux;
    }

    public void updateHeal(Integer heal) {
        this.heal = heal;
    }

}
