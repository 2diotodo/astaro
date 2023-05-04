package com.a604.boardservice.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
@Entity
@Table(name="member")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class Member {

	@Id
	@Column(name = "seq")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long seq;

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

	@Column(name = "is_deleted")
	private boolean isDeleted;

	@Column(name = "fword_cnt")
	private Integer fwordCnt;

	@Column(name = "created_at")
	private LocalDateTime createdAt;

	@Column(name = "updated_at")
	private LocalDateTime updatedAt;

}
