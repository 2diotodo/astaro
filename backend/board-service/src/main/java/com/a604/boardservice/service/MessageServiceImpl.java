package com.a604.boardservice.service;

import com.a604.boardservice.dto.MessageRequestDto;
import com.a604.boardservice.entity.Message;
import com.a604.boardservice.entity.MessageList;
import com.a604.boardservice.repository.MessageListRepository;
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

    @Autowired
    private MessageListRepository messageListRepository;

    @Override
    public List<Message> getMessagesByMessageListSeq(long messageListSeq) {
        return messageRepository.findByMessageListSeqAndIsDeletedFalseOrderByCreatedAtAsc(messageListSeq);
    }

    @Override
    public Message sendMessage(MessageRequestDto messageRequestDto) {
        List<String> fwords = FwordFilter.loadFwordList("classpath:fword_list.txt");
        String filteredContent = FwordFilter.filterFwords(messageRequestDto.getOriginalContent(), fwords);

        MessageList messageList;

        if (messageRequestDto.getMessageListSeq() == 0) {
            messageList = messageListRepository.findMessageListByResultSeqAndSenderSeq(messageRequestDto.getResultSeq(), messageRequestDto.getSenderSeq());
            if (messageList == null) {
                messageList = new MessageList();
                messageList.setSenderSeq(messageRequestDto.getSenderSeq());
                messageList.setReceiverSeq(messageRequestDto.getReceiverSeq());
                messageList.setResultSeq(messageRequestDto.getResultSeq());
                messageList.setLastMessage(filteredContent);
                messageList.setLastMessageTime(LocalDateTime.now());
                messageListRepository.save(messageList);
            } else {
                messageList.setLastMessage(filteredContent);
                messageList.setLastMessageTime(LocalDateTime.now());
                messageListRepository.save(messageList);
            }
        } else {
            messageList = messageListRepository.findById(messageRequestDto.getMessageListSeq()).orElse(null);

            messageList.setLastMessage(filteredContent);
            messageList.setLastMessageTime(LocalDateTime.now());
            messageListRepository.save(messageList);
        }

        Message message = new Message();
        message.setMessageListSeq(messageList.getSeq());
        message.setSenderSeq(messageRequestDto.getSenderSeq());
        message.setReceiverSeq(messageRequestDto.getReceiverSeq());
        message.setOriginalContent(messageRequestDto.getOriginalContent());

        message.setFilteredContent(filteredContent);

        message.setCreatedAt(LocalDateTime.now());
        message.setIsDeleted(false);

        return messageRepository.save(message);
    };
}
