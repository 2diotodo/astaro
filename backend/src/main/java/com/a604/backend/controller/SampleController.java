package com.a604.backend.controller;

import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/sample")
public class SampleController {

    @ApiOperation(value="테스트용 응답입니다.")
    @GetMapping("/")
    public ResponseEntity test() {
        return ResponseEntity.status(HttpStatus.OK).body("hello world");
    }

}
