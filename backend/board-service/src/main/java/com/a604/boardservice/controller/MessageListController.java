package com.a604.boardservice.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.a604.boardservice.dto.MessageListDto;
import com.a604.boardservice.service.MessageListService;

@RestController
@RequestMapping("/api/v1/room")
@CrossOrigin(origins = "*")
public class MessageListController {
	private static final String SUCCESS = "success";
	private static final String FAIL = "fail";

	@Autowired
	private MessageListService messageListService;

	// 채팅방 불러오기
	@GetMapping("/{member_seq}")
	public ResponseEntity<List<MessageListDto>> messageListByMemberSeq(@PathVariable("member_seq") int memberSeq){
		List<MessageListDto> messageListDtoList = new ArrayList<>();
		try{
			messageListDtoList = messageListService.findMessageListByMemberSeq(memberSeq);
			return new ResponseEntity<List<MessageListDto>>(messageListDtoList, HttpStatus.OK);
		}catch(Exception e){
			e.printStackTrace();
			return new ResponseEntity<List<MessageListDto>>(messageListDtoList, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	// 채팅방 업데이트
	@PatchMapping("{member_list_seq}")
	public ResponseEntity<String> messageListModify(@PathVariable("member_list_seq") int memberListSeq, @RequestBody MessageListDto messageListDto){
		try{
			messageListService.modifyMessageList(memberListSeq, messageListDto);
			return new ResponseEntity<>(SUCCESS, HttpStatus.OK);
		}catch(Exception e){
			e.printStackTrace();
			return new ResponseEntity<>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
