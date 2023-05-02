package com.a604.taroservice.repository;

import com.a604.taroservice.data.CardInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CardInfoRepository extends JpaRepository<CardInfo, Short> {
    CardInfo findCardInfoBySeq(short seq);
}
