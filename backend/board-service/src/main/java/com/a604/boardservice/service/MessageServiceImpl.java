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

        Message message = messageRequestDto.toEntity();
        message.setFilteredContent(filteredContent);
        message.setIsDeleted(false);

        MessageList messageList;

        // 스토리에서 메시지를 보낸 경우
        if (messageRequestDto.getMessageListSeq() == 0) {
            messageList = messageListRepository.findMessageListByResultSeqAndSenderSeq(messageRequestDto.getResultSeq(), messageRequestDto.getSenderSeq());
            // 첫 메시지인 경우
            if (messageList == null) {
                messageList = new MessageList();
                messageList.setSenderSeq(messageRequestDto.getSenderSeq());
                messageList.setReceiverSeq(messageRequestDto.getReceiverSeq());
                messageList.setResultSeq(messageRequestDto.getResultSeq());
                messageList.setLastMessage(filteredContent);
                messageList.setLastMessageTime(LocalDateTime.now());
                messageList.setIsDeleted(false);
                messageList.setIsLeaveReceiver(false);
                messageList.setIsLeaveSender(false);
                messageList.setIsReadSender(true);
                messageList.setIsReadReceiver(false);
                messageList = messageListRepository.save(messageList);
                message.setMessageListSeq(messageList.getSeq());
            } else {
                messageList.setLastMessage(filteredContent);
                message.setMessageListSeq(messageList.getSeq());
                messageListRepository.save(messageList);
            }
        } else {
            messageList = messageListRepository.findById(messageRequestDto.getMessageListSeq()).orElse(null);

            // 최신 메시지와 시간만 초기화
            messageList.setLastMessage(filteredContent);
            messageList.setLastMessageTime(LocalDateTime.now());
            messageListRepository.save(messageList);
        }

        return messageRepository.save(message);
    };
}
