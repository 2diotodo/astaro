package com.a604.boardservice.service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.a604.boardservice.dto.MessageListDto;
import com.a604.boardservice.entity.MessageList;
import com.a604.boardservice.repository.MessageListRepository;

@Service
public class MessageListServiceImpl implements MessageListService{
	@Autowired
	private MessageListRepository messageListRepository;

	@Override
	public void addMessageList(MessageListDto messageListDto) throws Exception {
		MessageList messageList = messageListDto.toEntity();
		messageList.setIsDeleted(false);
		messageListRepository.save(messageList);
	}

	@Override
	public List<MessageListDto> findMessageListByMemberSeq(long memberSeq) throws Exception {
		List<MessageList> messageListList = messageListRepository.findMessageListsByMemberSeq(memberSeq);
		List<MessageListDto> messageListDtoList = new ArrayList<>();
		for(int i=0; i<messageListList.size(); i++){
			MessageListDto messageListDto = messageListList.get(i).toDto();
			if(Duration.between(messageListDto.getLastMessageTime(), LocalDateTime.now()).toHours() >= 24){
				messageListList.get(i).setIsDeleted(true);
				messageListRepository.save(messageListList.get(i));
			}else{
				if(messageListDto.getSenderSeq() == memberSeq & !messageListDto.getIsReadSender()){
					messageListDto.setIsRead(true);
				}
				if(messageListDto.getReceiverSeq() == memberSeq & !messageListDto.getIsReadReceiver()){
					messageListDto.setIsRead(true);
				}
				messageListDtoList.add(messageListDto);
			}
		}
		return messageListDtoList;
	}

	@Override
	public void modifyMessageList(long messageListSeq, MessageListDto messageListDto) throws Exception {
		MessageList messageList = messageListDto.toEntity();
		messageList.setIsDeleted(false);
		messageListRepository.save(messageList);
	}
}
