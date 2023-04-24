package com.a604.taroservice.controller;

import com.a604.taroservice.service.TodayTaroService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/todaytaro")
public class TodayTaroController {

    private final TodayTaroService todayTaroService;
    @GetMapping
    public ResponseEntity<?> TodayTaro(){
        return new ResponseEntity<>(todayTaroService.todayTaro(), HttpStatus.OK);
    }

}
