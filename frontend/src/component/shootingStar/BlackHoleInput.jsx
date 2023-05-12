// src/component/shootingStar/BlackHoleInput.jsx
import React from "react";
import styled from "styled-components";

const InputContainer = styled.div`
  width: 80%;
  display: flex;
  align-items: center;
  position: relative;
`;

const Input = styled.textarea`
  width: 100%;
  height: 12rem;
  border-top: 0.5px solid white;
  border-bottom: 0.5px solid white;
  border-left: 0px;
  border-right: 0px;
  padding: 1rem;
  color: white;
  background-color: rgba(0, 0, 0, 0);
  outline: none;
  resize: none;
  font-size: 1rem;
  margin-top: 1rem;
`;

const SendButton = styled.button`
  position: absolute;
  right: 0;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  color: white;
`;

const BlackHoleInput = ({ textRef, placeholder }) => {
  return (
    <InputContainer>
      <Input
        className="shattered-text"
        placeholder={placeholder}
        ref={textRef}
      />
      <SendButton>
        <i className="fas fa-paper-plane"></i>
      </SendButton>
    </InputContainer>
  );
};

export default BlackHoleInput;
