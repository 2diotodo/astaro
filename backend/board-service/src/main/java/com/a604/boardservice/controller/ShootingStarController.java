package com.a604.boardservice.controller;

import com.a604.boardservice.service.MessageListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/star")
@CrossOrigin(origins = "*")
public class ShootingStarController {
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

//    @GetMapping
//    public ResponseEntity<ShootingStarDto>
}
