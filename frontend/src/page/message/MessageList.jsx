import React, { useState, useEffect} from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { getMessageList } from "@features/messageSlice/messageListSlice";
import MessageRoom from "@/component/message/MessageRoom";

const MessageRoomList = styled.div`
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translate(-50%, -10%);
  color: white;
  text-align: center;
`;

const MessageListPage = () => {
  const [messageRooms, setMessageRooms] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();
  
  const memberSeq = 1;

  useEffect(() => {
    dispatch(getMessageList(memberSeq)).then((data) => {
        console.log(data.payload); // 첫번째 payload 출력
        setMessageRooms(data.payload);
    });
  }, []);
    
  return (
    <div>
      <MessageRoomList>
        <h2>채팅방</h2>
        {messageRooms.map((messageRoom, index) => (
          <MessageRoom
            key={index}
            messageRoom={messageRoom}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            setMessageRooms={setMessageRooms}
          />
        ))}
      </MessageRoomList>
      
    </div>
  );
};

export default MessageListPage;