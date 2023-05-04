package com.a604.boardservice.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.ColumnDefault;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.a604.boardservice.dto.MessageListDto;

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
@Table(name="message_list")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class MessageList {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long seq;

	@Column(nullable = false)
	private long resultSeq;

	@Column(nullable = false)
	private long senderSeq;

	@Column(nullable = false)
	private long receiverSeq;

	@Column(columnDefinition = "BIT", length = 1, nullable = false)
	@ColumnDefault("1")
	private Boolean isReadSender;

	@Column(columnDefinition = "BIT", length = 1, nullable = false)
	@ColumnDefault("0")
	private Boolean isReadReceiver;

	@Column(columnDefinition = "BIT", length = 1, nullable = false)
	@ColumnDefault("0")
	private Boolean isLeaveSender;

	@Column(columnDefinition = "BIT", length = 1, nullable = false)
	@ColumnDefault("0")
	private Boolean isLeaveReceiver;

	@Column(nullable = false)
	private LocalDateTime lastMessageTime;

	@Column(columnDefinition = "TEXT", nullable = false)
	private String lastMessage;

	@CreatedDate
	@Column(updatable = false, nullable = false)
	private LocalDateTime createdAt;

	@LastModifiedDate
	@Column(nullable = false)
	private LocalDateTime updatedAt;

	@Column(columnDefinition = "BIT", length = 1, nullable = false)
	@ColumnDefault("0")
	private Boolean isDeleted;

	public MessageListDto toDto(){
		MessageListDto messageListDto = MessageListDto.builder()
			.seq(this.seq)
			.resultSeq(this.resultSeq)
			.senderSeq(this.senderSeq)
			.receiverSeq(this.receiverSeq)
			.isReadSender(this.isReadSender)
			.isReadReceiver(this.isReadReceiver)
			.isLeaveSender(this.isLeaveSender)
			.isLeaveReceiver(this.isLeaveReceiver)
			.lastMessage(this.lastMessage)
			.lastMessageTime(this.lastMessageTime)
			.createdAt(this.createdAt)
			.updatedAt(this.updatedAt)
			.isDeleted(this.isDeleted)
			.build();
		return messageListDto;
	}
}