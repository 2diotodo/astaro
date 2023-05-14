package com.a604.boardservice.service;

import java.util.List;

import com.a604.boardservice.dto.MessageListDto;

public interface MessageListService {
	// 채팅방 생성
	public void addMessageList(MessageListDto messageListDto) throws Exception;

	// 채팅방 불러오기
	public List<MessageListDto> findMessageListByMemberSeq(long memberSeq) throws Exception;

	// 채팅방 나가기
	public void modifyMessageList(long memberListSeq, long messageListSeq, MessageListDto messageListDto) throws Exception;
}
