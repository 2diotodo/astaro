package com.a604.boardservice.controller;

import com.a604.boardservice.dto.TaroResultDto;
import com.a604.boardservice.service.MessageListService;
import com.a604.boardservice.service.ShootingStarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/v1/star")
public class ShootingStarController {
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";
    @Autowired
    private ShootingStarService shootingStarService;

    /**
     * 별똥별 랜덤 조회
     * 자기 자신이 작성한 고민 제외
     * @return
     */
    @GetMapping("")
    public ResponseEntity<?> getRandomTaroResult(HttpServletRequest request, @RequestParam("category") String category) {
        try {
            long memberSeq = Long.valueOf(request.getHeaders("X-Authorization-Seq").nextElement());
            TaroResultDto taroResultDto = shootingStarService.getTaroResult(memberSeq, category);
            // 해당하는 타로가 있는지 확인
            if (taroResultDto == null) {
                return new ResponseEntity<>(SUCCESS, HttpStatus.NO_CONTENT);
            } else {
                return new ResponseEntity<>(taroResultDto, HttpStatus.OK);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
