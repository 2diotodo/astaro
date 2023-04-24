package com.a604.boardservice.repository;

import com.a604.boardservice.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepository extends JpaRepository<Message, Long> {
    /**
     * 메시지 룸에 해당하는 메시지 조회
     */
}
