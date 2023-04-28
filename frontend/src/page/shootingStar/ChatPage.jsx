import React, { useEffect } from "react";
import styled from "styled-components";

import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setSelectedChatRoom, setMessages, addMessage } from "../../features/shootingStarSlice/chatSlice";
import {Background} from "@component/Background";
import MessageInput from "../../component/shootingStar/MessageInput"

const MessageSeparator = styled.hr`
  margin: 0;
  border: 0;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  width: 100%; // 구분선의 너비를 100%로 설정
`;

const Wrapper = styled.div`
      height:100%;
      width:100%;
      position: absolute;
    `
const Title = styled.h1`
  color: white;
`;

const Message = styled.li`
  color: white;
  background-color: rgba(75, 75, 75, 0.5);
  margin-bottom: 5px;
  border-radius: 5px;
  padding: 10px;
  align-items: center;
  max-width: 100%;
  min-height: 4rem;
  word-wrap: break-word;
  display: inline-block; // 인라인 블록 요소로 변경
  white-space: pre-wrap; // 줄바꿈 처리
`;

const MessageLeft = styled(Message)`
  text-align: left;
  background-color: rgba(255, 255, 255, 0);
  align-self: flex-start; // 왼쪽 정렬을 위한 스타일 추가
`;

const MessageRight = styled(Message)`
  text-align: left;
  background-color: rgba(255, 255, 255, 0);
  align-self: flex-start; // 오른쪽 정렬을 위한 스타일 추가
`;

const MessageList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  overflow-y: auto;
  display: flex;
  flex-direction: column; // 메시지 목록을 위한 새로운 스타일 추가
`;
const ChatWindow = styled.div`
  background-color: rgba(255, 255, 255, 0.2);
  // border-radius: 10px;
  padding: 15px;
  // margin: 2rem;
  height: 70%;
  overflow-y: auto;
`;

const MessageLabel = styled.p`
  font-size: 0.5rem;
  color: white;
  margin-bottom: 2px;
  margin-top: 0;
`;

// 임시 가 데이터
const loggedInMemberSeq = 1;

const ChatPage = () => {
  const { id } = useParams();
  const state = useSelector((state) => state);
  console.log("State: ", state);
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

  const handleSendMessage = async (message) => {
    try {
      await fetch(`http://localhost:8082/api/v1/message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messageListSeq: selectedChatRoom,
          senderSeq: 1,
          receiverSeq: 2,
          originalContent: message,
          resultSeq: 1,
        })
      })
    } catch (error) {
      console.error("메시지 전송 실패")
    }
  }

  useEffect(() => {
    const fetchMessages = async () => {
      const messages = await fetchMessagesFromAPI(id);
      dispatch(setMessages(messages));
    };

    dispatch(setSelectedChatRoom(id));
    fetchMessages();
  }, [id, dispatch]);

  return (
    <div>
      <Background/>
      <Wrapper>
        <Title>{selectedChatRoom ? `${selectedChatRoom}번 님과의 쪽지함` : '채팅방을 불러오는 중...'}</Title>
        <ChatWindow>
          <MessageList>
          {messages.map((message) => {
            const MessageComponent =
              message.senderSeq === loggedInMemberSeq ? MessageRight : MessageLeft;
            const messageLabel =
              message.senderSeq === loggedInMemberSeq ? "보낸 쪽지" : `받은 쪽지`;
            return (
              <React.Fragment key={message.seq}>
                <MessageComponent>
                  <MessageLabel>{messageLabel}</MessageLabel>
                  {message.filteredContent}
                </MessageComponent>
                  <MessageSeparator /> {/* 구분선 추가 */}
              </React.Fragment>
            );
          })}
          </MessageList>
        </ChatWindow>
        <MessageInput onSubmit={handleSendMessage} MessageInput/>
      </Wrapper>
    </div>
  );
};

export default ChatPage;
