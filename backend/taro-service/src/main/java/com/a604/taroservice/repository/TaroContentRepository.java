package com.a604.taroservice.repository;

import com.a604.taroservice.data.TaroContent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaroContentRepository extends JpaRepository<TaroContent, Integer> {
    List<TaroContent> findTaroContentsByCardSeq(short seq);
}
