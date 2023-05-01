package com.a604.boardservice.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.a604.boardservice.entity.MessageList;

public interface MessageListRepository extends JpaRepository<MessageList, Long> {
	@Query(nativeQuery = true, value = "SELECT * FROM message_list WHERE (sender_seq = :memberSeq AND is_deleted = 0) OR (receiver_seq = :memberSeq AND is_deleted = 0) ORDER BY last_message_time DESC")
	List<MessageList> findMessageListsByMemberSeq(long memberSeq);

	MessageList findMessageListByResultSeqAndSenderSeq(long resultSeq, long senderSeq);
}
