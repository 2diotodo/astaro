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
		messageListRepository.save(messageListDto.toEntity());
	}

	@Override
	public List<MessageListDto> findMessageListByMemberSeq(int memberSeq) throws Exception {
		List<MessageList> messageListList = messageListRepository.findMessageListsByMemberSeq(memberSeq);
		List<MessageListDto> messageListDtoList = new ArrayList<>();
		for(int i=0; i<messageListList.size(); i++){
			MessageListDto messageListDto = messageListList.get(i).toDto();
			if(Duration.between(messageListDto.getLastMessageTime(), LocalDateTime.now()).toHours() >= 24){
				messageListList.get(i).setIsDeleted((byte)1);
				messageListRepository.save(messageListList.get(i));
			}else{
				if(messageListDto.getSenderSeq() == memberSeq & messageListDto.getIsReadSender() == 0){
					messageListDto.setIsRead((byte)1);
				}
				if(messageListDto.getReceiverSeq() == memberSeq & messageListDto.getIsReadReceiver() == 0){
					messageListDto.setIsRead((byte)1);
				}
				messageListDtoList.add(messageListDto);
			}
		}
		return messageListDtoList;
	}

	@Override
	public void modifyMessageList(int messageSeq, MessageListDto messageListDto) throws Exception {
		messageListRepository.save(messageListDto.toEntity());
	}
}
