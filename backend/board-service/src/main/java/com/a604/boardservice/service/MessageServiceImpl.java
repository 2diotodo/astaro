package com.a604.boardservice.service;

import com.a604.boardservice.dto.MessageRequestDto;
import com.a604.boardservice.dto.MessageResponseDto;
import com.a604.boardservice.entity.Member;
import com.a604.boardservice.entity.Message;
import com.a604.boardservice.entity.MessageList;
import com.a604.boardservice.entity.TaroResult;
import com.a604.boardservice.repository.MemberRepository;
import com.a604.boardservice.repository.MessageListRepository;
import com.a604.boardservice.repository.MessageRepository;
import com.a604.boardservice.repository.ShootingStarRepository;
import com.a604.boardservice.util.FwordFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLOutput;
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

    @Autowired
    private ShootingStarRepository shootingStarRepository;

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
            Member receiver = memberRepository.findById(message.getReceiverSeq()).orElse(null);

            responseDto.setSenderNickname(sender.getNickname());
            responseDto.setReceiverNickname(receiver.getNickname());

            messageResponseDtoList.add(responseDto);
        }

        return messageResponseDtoList;
    }


    @Override
    public Message sendMessage(MessageRequestDto messageRequestDto, long memberSeq) {
        List<String> fwords = FwordFilter.loadFwordList("classpath:fword_list.txt");
        String filteredContent = FwordFilter.filterFwords(messageRequestDto.getOriginalContent(), fwords);

        Message message = messageRequestDto.toEntity();
        message.setFilteredContent(filteredContent);
        message.setIsDeleted(false);

        MessageList messageList = messageListRepository.findMessageListByResultSeqAndSenderSeq(messageRequestDto.getResultSeq(), memberSeq);
        TaroResult taroResult = shootingStarRepository.findBySeq(messageRequestDto.getResultSeq());
        System.out.println("#123" + messageRequestDto.getResultSeq());

        // 스토리에서 메시지를 보낸 경우
        if (messageRequestDto.getMessageListSeq() == 0) {
            // 첫 메시지인 경우
            messageList = new MessageList();
            System.out.println("서비스 멤버 시퀀스: " + memberSeq);
            messageList.setResultSeq(messageRequestDto.getResultSeq());
            messageList.setReceiverSeq(taroResult.getMemberSeq());
            messageList.setSenderSeq(memberSeq);
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
            messageList = messageListRepository.findById(messageRequestDto.getMessageListSeq()).orElse(null);
            // 최신 메시지와 시간만 초기화
            messageList.setIsReadSender(false);
            messageList.setLastMessage(filteredContent);
            messageList.setLastMessageTime(LocalDateTime.now());
            messageListRepository.save(messageList);
        }
        message.setReceiverSeq(messageList.getReceiverSeq());
        message.setSenderSeq(messageList.getSenderSeq());
        return messageRepository.save(message);
    };
}
