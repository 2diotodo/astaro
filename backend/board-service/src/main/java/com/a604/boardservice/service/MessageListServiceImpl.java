package com.a604.boardservice.service;

import java.time.Duration;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.concurrent.TimeUnit;

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

				LocalDateTime createdAt = messageListDto.getCreatedAt();
				Instant instant = createdAt.atZone(ZoneId.systemDefault()).toInstant();
				Date date = Date.from(instant);

				Date now = new Date();
				long diffInMillies = now.getTime() - date.getTime();
				float diffInSeconds = TimeUnit.MILLISECONDS.toSeconds(diffInMillies);

				messageListDto.setN(diffInSeconds/8640);

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
