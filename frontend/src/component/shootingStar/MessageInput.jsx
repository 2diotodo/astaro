import React, { useState } from "react";
import styled from "styled-components";

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: rgba(75, 75, 75, 0.5);
  padding: 10px;
  border-radius: 5px;
  margin-left: 1rem;
  margin-right: 1rem;
  margin-top: 1rem;
`;

const Input = styled.input`
  flex-grow: 1;
  border: none;
  color: rgba(255, 255, 255, 1);
  outline: none;
  background-color: rgba(75, 75, 75, 0.5);
  padding: 15px;
  &::placeholder {
    color: rgba(255, 255, 255, 0.8);
    opacity: 0.8;
  }
`;

const SendButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  outline: none;
  margin-left: 8px;
  color: black;
  opacity: 0.5;
`;

const PaperPlaneIcon = styled.svg`
  width: 24px;
  height: 24px;
`;

const MessageInput = ({ onSubmit }) => {
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = () => {
    if (message.trim() !== "") {
      onSubmit(message);
      setMessage("");
    }
  };

  const handleEnter = () => {
    if (message.trim() !== "" && window.event.keyCode == 13) {
      onSubmit(message);
      setMessage("");
    }
  };

  return (
    <InputContainer>
      <Input
        type="text"
        placeholder="메시지를 입력하세요..."
        value={message}
        onChange={handleChange}
        onKeyDown={handleEnter}
      />
      {/* 전송 아이콘 추가 */}
      <SendButton onClick={handleSubmit}>
        <PaperPlaneIcon viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </PaperPlaneIcon>
      </SendButton>
    </InputContainer>
  );
};

export default MessageInput;
