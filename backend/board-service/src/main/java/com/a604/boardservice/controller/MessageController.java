package com.a604.boardservice.controller;

import com.a604.boardservice.dto.MessageDto;
import com.a604.boardservice.dto.MessageRequestDto;
import com.a604.boardservice.entity.Message;
import com.a604.boardservice.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping
public class MessageController {
    @Autowired
    private MessageService messageService;

    @GetMapping("/message/{messageListSeq}")
    public List<MessageDto> getMessagesByMessageListSeq(@PathVariable int messageListSeq) {
        List<Message> messages = messageService.getMessagesByMessageListSeq(messageListSeq);
        return messages.stream().map(MessageDto::new).collect(Collectors.toList());
    }

    @PostMapping("/message")
    public MessageDto createMessage(@RequestBody MessageRequestDto messageRequestDto) {
        Message message = messageService.sendMessage(messageRequestDto);
        return new MessageDto(message);
    }
}
