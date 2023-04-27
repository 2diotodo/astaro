package com.a604.taroservice.repository;

import com.a604.taroservice.data.TaroContent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaroResultRepository extends JpaRepository<TaroContent, Integer> {

}
