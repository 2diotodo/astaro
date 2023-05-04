package com.a604.taroservice.controller;

import com.a604.taroservice.data.dto.TaroResultDto;
import com.a604.taroservice.service.TaroResultService;
import com.a604.taroservice.service.TodayTaroService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/tarot")
public class TaroController {

    private final TodayTaroService todayTaroService;
    private final TaroResultService taroResultService;

    @GetMapping("/today")
    @ApiOperation(value = "오늘의 운세", notes = "랜덤하게 오늘의 운세 값을 보여줍니다.")
    public ResponseEntity<?> TodayTaro(){
        return new ResponseEntity<>(todayTaroService.todayTaro(), HttpStatus.OK);
    }

    @PostMapping("/result")
    @ApiOperation(value = "타로 결과 저장", notes = "타로 결과값을 저장합니다.")
    public ResponseEntity<?> SaveTaroResult(TaroResultDto taroResultDto) throws IOException {
        taroResultService.saveTaroResult(taroResultDto);
        return new ResponseEntity<>(taroResultDto, HttpStatus.OK);
    }
}
