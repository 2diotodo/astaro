import React, { useState, useEffect, useSelector } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { getMessageList } from "@features/messageSlice/messageListSlice";
import { now } from "jquery";

const MessageRoomList = styled.div`
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translate(-50%, -10%);
  color: white;
  text-align: center;
`;

const RoomContainer = styled.div`
  border-radius: 10px;
  background-color: rgba(241, 241, 241, 0.2);
  padding: 10px;
  width: 300px;
  margin: 10px;
`;

const Nickname = styled.div`
  font-size: 20px;
  margin-bottom: 5px;
  text-align: left;
`;

const LastMessage = styled.div`
  font-size: 20px;
  margin-bottom: 5px;
  text-align: left;
  line-height: 1.5;
`;

const HorizontalLine = styled.div`
  width: 100%;
  height: 5px;
  margin-bottom: 5px;
  background-image: linear-gradient(
    to right,
    rgba(0, 17, 169, 0.6) ${props => props.n * 10}%,
    rgba(217, 217, 217, 1.0) ${props => props.n * 10 + 25}%,
    rgba(217, 217, 217, 1.0) ${props => 100 - props.n * 10 - 25}%,
    rgba(217, 217, 217, 1.0) ${props => 100 - props.n * 10}%
  );
`;

const MessageRoom = ({ nickname, lastMessage, n }) => (
    <div>
      <RoomContainer>
        <Nickname>{nickname}</Nickname>
        <HorizontalLine n={n} />
       <LastMessage>{lastMessage}</LastMessage>
      </RoomContainer>
    </div>
);

const MessageListPage = () => {
  const [messageRooms, setMessageRooms] = useState([]);

  const dispatch = useDispatch();
    
  useEffect(() => {
    dispatch(getMessageList(1)).then((data) => {
        console.log(data.payload); // 첫번째 payload 출력
        setMessageRooms(data.payload);
    });
  }, []);
    
  return (
    <div>
      <MessageRoomList>
        <h2>채팅방</h2>
        {messageRooms.map((messageRooms, index) => (
          <MessageRoom
            key={index}
            nickname={messageRooms.nickname}
            lastMessage={messageRooms.lastMessage}
            n={messageRooms.n}
          />
        ))}
      </MessageRoomList>
    </div>
  );
};

export default MessageListPage;