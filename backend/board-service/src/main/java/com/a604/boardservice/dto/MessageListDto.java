package com.a604.boardservice.dto;

import java.time.LocalDateTime;

import com.a604.boardservice.entity.MessageList;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MessageListDto {
	private long seq;
	private long resultSeq;
	private long senderSeq;
	private long receiverSeq;
	private Boolean isReadSender;
	private Boolean isReadReceiver;
	private Boolean isLeaveSender;
	private Boolean isLeaveReceiver;
	private String lastMessage;
	private LocalDateTime lastMessageTime;
	private LocalDateTime createdAt;
	private LocalDateTime updatedAt;
	private Boolean isDeleted;
	private Boolean isRead;
	private String nickname;
	private int notReadCnt;
	private float n;
	private String remainedTime;


	public MessageList toEntity(){
		MessageList messageList = MessageList.builder()
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
		return messageList;
	}
}
