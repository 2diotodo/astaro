import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setSelectedChatRoom, setMessages, addMessage } from "../features/shootingStarSlice/chatSlice";

const ChatPage = () => {
  const { id } = useParams();
  const selectedChatRoom = useSelector((state) => state.chat.selectedChatRoom);
  const messages = useSelector((state) => state.chat.messages);
  const dispatch = useDispatch();

  const fetchMessagesFromAPI = async (id) => {
    try {
        const response = await fetch(`http://localhost:8082/api/v1/message/${id}`);
        const messages = await response.json();
    
        return messages;
      } catch (error) {
        console.error("Error fetching messages:", error);
        return [];
      }
  };

  useEffect(() => {
    // 선택된 채팅방의 메시지를 가져오는 함수를 호출합니다. (예: API 요청)
    const fetchMessages = async () => {
      // 메시지 목록을 가져오는 API를 호출하고, 결과를 messages 변수에 할당합니다.
      const messages = await fetchMessagesFromAPI(id);
      console.log("messages :", messages)

      // 가져온 메시지 목록을 Redux 상태에 저장합니다.
      dispatch(setMessages(messages));
    };

    // 선택한 채팅방을 Redux 상태에 저장합니다.
    dispatch(setSelectedChatRoom(id));

    // 선택한 채팅방의 메시지를 불러옵니다.
    fetchMessages();
  }, [id, dispatch]);

  return (
    <div>
      <h1>{selectedChatRoom} 채팅방</h1>
      <ul>
        {messages.map((message) => (
          <li key={message.seq}>{message.filteredContent}</li>
        ))}
      </ul>
    </div>
  );
};

export default ChatPage;
