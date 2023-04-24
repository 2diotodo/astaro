package com.a604.boardservice.service;

import com.a604.boardservice.dto.MessageRequestDto;
import com.a604.boardservice.entity.Message;
import com.a604.boardservice.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageServiceImpl implements MessageService{
    @Autowired
    private MessageRepository messageRepository;

    @Override
    public List<Message> getMessagesByMessageListSeq(int messageListSeq) {
        return messageRepository.findByMessageListSeqAndIsDeletedFalseOrderByCreatedAtAsc(messageListSeq);
    }

    @Override
    public Message sendMessage(MessageRequestDto messageRequestDto) {
        Message message = new Message();
        message.setMessageListSeq(messageRequestDto.getMessageListSeq());
        message.setSenderSeq(messageRequestDto.getSenderSeq());
        message.setReceiverSeq(messageRequestDto.getReceiverSeq());
        message.setOriginalContent(messageRequestDto.getOriginalContent());
        message.setFilteredContent(messageRequestDto.getFilteredContent());
        message.setIsDeleted(false);

        return messageRepository.save(message);
    };
}
