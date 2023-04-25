package com.a604.boardservice.service;

import com.a604.boardservice.dto.MessageRequestDto;
import com.a604.boardservice.entity.Message;
import com.a604.boardservice.repository.MessageRepository;
import com.a604.boardservice.util.FwordFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class MessageServiceImpl implements MessageService{
    @Autowired
    private MessageRepository messageRepository;

    @Override
    public List<Message> getMessagesByMessageListSeq(long messageListSeq) {
        return messageRepository.findByMessageListSeqAndIsDeletedFalseOrderByCreatedAtAsc(messageListSeq);
    }

    @Override
    public Message sendMessage(MessageRequestDto messageRequestDto) {
        Message message = new Message();

        message.setMessageListSeq(messageRequestDto.getMessageListSeq());
        message.setSenderSeq(messageRequestDto.getSenderSeq());
        message.setReceiverSeq(messageRequestDto.getReceiverSeq());
        message.setOriginalContent(messageRequestDto.getOriginalContent());

        List<String> fwords = FwordFilter.loadFwordList("classpath:fword_list.txt");


        String filteredContent = FwordFilter.filterFwords(messageRequestDto.getOriginalContent(), fwords);
        message.setFilteredContent(filteredContent);

        message.setCreatedAt(LocalDateTime.now());
        message.setIsDeleted(false);

        return messageRepository.save(message);
    };


}
