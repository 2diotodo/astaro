package com.a604.boardservice.service;

import com.a604.boardservice.dto.MessageRequestDto;
import com.a604.boardservice.dto.MessageResponseDto;
import com.a604.boardservice.entity.Member;
import com.a604.boardservice.entity.Message;
import com.a604.boardservice.entity.MessageList;
import com.a604.boardservice.repository.MemberRepository;
import com.a604.boardservice.repository.MessageListRepository;
import com.a604.boardservice.repository.MessageRepository;
import com.a604.boardservice.util.FwordFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class MessageServiceImpl implements MessageService{
    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private MessageListRepository messageListRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Override
    public List<MessageResponseDto> getMessagesByMessageListSeq(long messageListSeq) {
        List<Message> messages = messageRepository.findByMessageListSeqAndIsDeletedFalseOrderByCreatedAtDesc(messageListSeq);
        List<MessageResponseDto> messageResponseDtoList = new ArrayList<>();

        for (Message message : messages) {
            MessageResponseDto responseDto = new MessageResponseDto();

            responseDto.setSeq(message.getSeq());
            responseDto.setSenderSeq(message.getSenderSeq());
            responseDto.setReceiverSeq(message.getReceiverSeq());
            responseDto.setOriginalContent(message.getOriginalContent());
            responseDto.setFilteredContent(message.getFilteredContent());
            responseDto.setCreatedAt(message.getCreatedAt());

            Member sender = memberRepository.findById(message.getSenderSeq()).orElse(null);
            if (sender != null) {
                responseDto.setNickname(sender.getNickname());
            }

            messageResponseDtoList.add(responseDto);
        }




        return messageResponseDtoList;
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
                messageList.setIsReadSender(false);
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
