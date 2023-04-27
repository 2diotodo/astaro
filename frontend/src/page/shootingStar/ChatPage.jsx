import React, { useEffect } from "react";
import styled from "styled-components";

import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setSelectedChatRoom, setMessages, addMessage } from "../../features/shootingStarSlice/chatSlice";
import {Background} from "@component/Background";
import MessageInput from "../../component/shootingStar/MessageInput"

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
  word-wrap: break-word;
  height: 4rem; // 쪽지의 높이를 동일하게 맞추기 위해 높이를 지정합니다.
  overflow: hidden; // 높이를 넘어가는 텍스트를 숨깁니다.
`;

const MessageLeft = styled(Message)`
  text-align: left;
  background-color: rgba(255, 255, 255, 0);
`;

const MessageRight = styled(Message)`
  text-align: left;
  background-color: rgba(255, 255, 255, 0);
  // margin-left: auto;
`;

const MessageList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  overflow-y: auto;
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
                message.senderSeq === loggedInMemberSeq ? "보낸 쪽지" : `받은 쪽지`
                return (
                  <React.Fragment key={message.seq}>
                    <MessageComponent>
                      <MessageLabel>{messageLabel}</MessageLabel>
                      {message.filteredContent}
                    </MessageComponent>
                    <hr></hr>
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
