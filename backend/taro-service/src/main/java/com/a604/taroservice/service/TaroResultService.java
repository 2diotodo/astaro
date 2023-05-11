package com.a604.taroservice.service;

import com.a604.taroservice.config.S3Config;
import com.a604.taroservice.data.TaroResult;
import com.a604.taroservice.data.dto.FlaskDto;
import com.a604.taroservice.data.dto.TaroResultDto;
import com.a604.taroservice.repository.TaroResultRepository;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.RequiredArgsConstructor;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import javax.transaction.Transactional;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.net.URL;
import java.time.LocalDate;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class TaroResultService {
    private final TaroResultRepository taroResultRepository;
    private final AmazonS3Client amazonS3Client;
    private final S3Config s3Config;
    @Value("${flask.baseurl}")
    private String baseurl;


    public TaroResultDto saveTaroResult(TaroResultDto dto) throws IOException {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        FlaskDto flaskDto = new FlaskDto(dto.getImgUrl());
        HttpEntity<FlaskDto> requestEntity = new HttpEntity<>(flaskDto);
        String flaskUrl = baseurl + "/api/run-script";
        String videoUrl = restTemplate.postForObject(flaskUrl, requestEntity, String.class);

        URL url = new URL(dto.getImgUrl());
        byte[] imageBytes = IOUtils.toByteArray(url.openStream());
        String fileName = UUID.randomUUID() + ".png";
        amazonS3Client.putObject(new PutObjectRequest(s3Config.getBucket(), fileName, new ByteArrayInputStream(imageBytes), null));

        dto.setImgUrl(amazonS3Client.getUrl(s3Config.getBucket(), fileName).toString());
        dto.setVideoUrl(videoUrl);
        boolean dangerous = false;
        if(dto.getContentInput().contains("자살")){
            dangerous = true;
        }
        
        taroResultRepository.save(dtoToEntity(dto, dangerous));
        return dto;
    }

    public TaroResult dtoToEntity(TaroResultDto dto, boolean dangerous){
        return TaroResult.builder()
                .memberSeq(dto.getMemberSeq())
                .category(dto.getCategory())
                .contentInput(dto.getContentInput())
                .cardSeqList(dto.getCardSeqList())
                .resultList(dto.getContentList())
                .imgUrl(dto.getImgUrl())
                .story(dto.getStory())
                .isDangerous(dangerous)
                .createdAt(LocalDate.now())
                .build();
    }

}
