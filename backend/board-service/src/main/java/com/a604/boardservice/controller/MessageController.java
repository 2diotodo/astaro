package com.a604.boardservice.controller;

import com.a604.boardservice.dto.MessageResponseDto;
import com.a604.boardservice.dto.MessageRequestDto;
import com.a604.boardservice.entity.Message;
import com.a604.boardservice.service.MessageListService;
import com.a604.boardservice.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/message")
public class MessageController {
    @Autowired
    private MessageService messageService;

    @Autowired
    private MessageListService messageListService;

    /**
     * message 불러오기
     * @param messageListSeq
     * @return
     */
    @GetMapping("/{messageListSeq}")
    public ResponseEntity<?> getMessagesByMessageListSeq(@PathVariable long messageListSeq) {
        List<MessageResponseDto> messages = messageService.getMessagesByMessageListSeq(messageListSeq);

        if (messages != null && !messages.isEmpty()) {
            List<MessageResponseDto> messageResponseDtoList = messages;
            return ResponseEntity.ok(messageResponseDtoList);
        } else {
            // Return error message with a custom HTTP status code (e.g. NOT_FOUND)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No messages found for the specified messageListSeq.");
        }
    }

    /**
     * 메시지 전송
     * @param messageRequestDto
     * @return
     */
    @PostMapping()
    public ResponseEntity<?> createMessage(@RequestBody MessageRequestDto messageRequestDto) {
        Message message = messageService.sendMessage(messageRequestDto);
        if (message != null) {
            return ResponseEntity.ok(HttpStatus.OK);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("메시지 없음");
        }
    }
}
