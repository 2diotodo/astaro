import React, { useEffect } from "react";
import styled from "styled-components";

import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  setSelectedChatRoom,
  fetchMessages,
  sendMessage
} from "../../features/shootingStarSlice/chatSlice";
import MessageInput from "../../component/shootingStar/MessageInput";


const MessageSeparator = styled.hr`
  margin: 0;
  border: 0;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  width: 100%;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  position: absolute;
`;

const Title = styled.h1`
  color: white;
  flex-shrink: 0;
  font-size: 1.5rem;
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
  display: inline-block;
  white-space: pre-wrap;
`;

const MessageLeft = styled(Message)`
  text-align: left;
  background-color: rgba(255, 255, 255, 0);
  align-self: flex-start;
`;

const MessageRight = styled(Message)`
  text-align: right;
  background-color: rgba(255, 255, 255, 0);
  align-self: flex-end;
`;


const MessageList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

const ChatWindow = styled.div`
  background-color: rgba(255, 255, 255, 0.2);
  padding: 15px;
  flex-grow: 1;
  overflow-y: auto;
`;

const MessageLabel = styled.p`
  font-size: 0.5rem;
  color: ${props => props.sender == loggedInMemberSeq ? 'rgba(215, 252, 254, 1)' : 'rgba(248, 254, 215, 1)'}; // 조건부 스타일링
  margin-bottom: 2px;
  margin-top: 0;
`;

const MessageInputWrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  flex-shrink: 0;
`;

const loggedInMemberSeq = `${localStorage.getItem("seq")}`;

const ChatPage = () => {
  const { id } = useParams();
  const selectedChatRoom = useSelector((state) => state.chat.selectedChatRoom);
  const messages = useSelector((state) => state.chat.messages);
  console.log("message : ", messages)
  console.log("message[0] : ", messages[0])
  const dispatch = useDispatch();

  const handleSendMessage = async (message) => {
    console.log(message)
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
          {messages.length > 0 && 
            (messages[0].senderSeq == loggedInMemberSeq
              ? `${messages[0].receiverNickname}님과의 쪽지함`
              : `${messages[0].senderNickname}님과의 쪽지함`)
          }
        </Title>
        <ChatWindow>
          <MessageList>
            {messages.map((message) => {
              const MessageComponent =
                message.senderSeq == loggedInMemberSeq
                  ? MessageRight
                  : MessageLeft;
              const messageLabel =
                message.senderSeq == loggedInMemberSeq
                  ? "내가 보낸 쪽지"
                  : `${message.senderNickname}님이 보낸 쪽지`;
              return (
                <React.Fragment key={message.seq}>
                  <MessageComponent>
                    <MessageLabel sender={message.senderSeq}>{messageLabel}</MessageLabel>
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
