import React, { useEffect } from "react";
import styled from "styled-components";

import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  setSelectedChatRoom,
  setMessages,
  fetchMessages,
  sendMessage
  // addMessage,
} from "../../features/shootingStarSlice/chatSlice";
// import { Background } from "@component/common/Background";
import MessageInput from "../../component/shootingStar/MessageInput";


const MessageSeparator = styled.hr`
  margin: 0;
  border: 0;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  width: 100%; // 구분선의 너비를 100%로 설정
`;

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
`;
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
  padding: 15px;
  height: 80%;
  overflow-y: auto;
`;

const MessageLabel = styled.p`
  font-size: 0.5rem;
  color: white;
  margin-bottom: 2px;
  margin-top: 0;
`;

const MessageInputWrapper = styled.div`
  position: fixed;
  bottom: 1rem;
  left: 0;
  right: 0;
  padding: 0 15px;
  background-color: rgba(0, 0, 0, 0.6);
`;

// 임시 가 데이터
const loggedInMemberSeq = 5;

const ChatPage = () => {
  const { id } = useParams();
  const selectedChatRoom = useSelector((state) => state.chat.selectedChatRoom);
  const messages = useSelector((state) => state.chat.messages);
  console.log(messages)
  const dispatch = useDispatch();

  const handleSendMessage = async (message) => {
    dispatch(
      sendMessage({
        messageListSeq: selectedChatRoom,
        originalContent: message,
      })
    ).then(() => {
      dispatch(fetchMessages(id));
  });;
  };
  
  useEffect(() => {
    dispatch(setSelectedChatRoom(id));
    dispatch(fetchMessages(id));
  }, [id, dispatch]);

  return (
    <>
      <Wrapper>
        <Title>
          {selectedChatRoom
            ? `${selectedChatRoom}번 님과의 쪽지함`
            : "채팅방을 불러오는 중..."}
        </Title>
        <ChatWindow>
          <MessageList>
            {messages.map((message) => {
              const MessageComponent =
                message.senderSeq === loggedInMemberSeq
                  ? MessageRight
                  : MessageLeft;
              const messageLabel =
                message.senderSeq === loggedInMemberSeq
                  ? "내가 보낸 쪽지"
                  : `${message.nickname}님이 보낸 쪽지`;
              return (
                <React.Fragment key={message.seq}>
                  <MessageComponent>
                    <MessageLabel>{messageLabel}</MessageLabel>
                    {message.filteredContent}
                  </MessageComponent>
                  <MessageSeparator />
                </React.Fragment>
              );
            })}
          </MessageList>
        </ChatWindow>
        <MessageInputWrapper>
          <MessageInput onSubmit={handleSendMessage} />
        </MessageInputWrapper>
      </Wrapper>
    </>
  );
};

export default ChatPage;
