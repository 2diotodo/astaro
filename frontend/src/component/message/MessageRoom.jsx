import React, { useState, useEffect, useSelector } from "react";
import styled from "styled-components";
import { Popper } from '@mui/material';
import { BsThreeDots } from "react-icons/bs";

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
  width: 300px;
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

const RoomHeader = styled.div`
  display: flex;
  justifyContent: space-between;
`;

const PopperContent = styled.div`
  color : black;
  background-color: rgba(217, 217, 217, 0.9);
`;

const MessageRoom = ({ nickname, lastMessage, n, remainedTime}) => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const id = open ? 'simple-popper' : undefined;

  const handleClick = (event) => {
    setOpen((prevOpen) => !prevOpen);
    setAnchorEl(event.currentTarget);
  };

  return (
    <div>
      <RoomContainer>
        <RoomHeader>
          <Nickname>{nickname}</Nickname>
          <BsThreeDots onClick={handleClick}></BsThreeDots>
        </RoomHeader>
        <Popper id={id} open={open} anchorEl={anchorEl}>
          <PopperContent>
            남은시간 {remainedTime}
          </PopperContent>
          <PopperContent>
            채팅방 나가기
          </PopperContent>
        </Popper>
        <HorizontalLine n={n} />
        <LastMessage>{lastMessage}</LastMessage>
      </RoomContainer>
    </div>
  );
};

export default MessageRoom;