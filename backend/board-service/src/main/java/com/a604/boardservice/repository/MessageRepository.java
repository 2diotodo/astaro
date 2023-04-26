package com.a604.boardservice.repository;

import com.a604.boardservice.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {
    /**
     * 메시지 방에 해당하는 메시지 불러오기
     * @param messageListSeq
     * @return List<Message>
     */
    List<Message> findByMessageListSeqAndIsDeletedFalseOrderByCreatedAtAsc(long messageListSeq);
}
