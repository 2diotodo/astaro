import React, { useState, useRef, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
const smoky = keyframes`
  60% {
    text-shadow: 0 0 40px whitesmoke;
  }
  to {
    transform:
      translate3d(15rem,-8rem,0)
      rotate(-40deg)
      skewX(70deg)
      scale(0.5);
    text-shadow: 0 0 20px whitesmoke;
    opacity: 0;
  }
`;

const smokyMirror = keyframes`
  60% {
    text-shadow: 0 0 40px whitesmoke;
  }
  to {
    transform:
      translate3d(18rem,-8rem,0)
      rotate(-40deg)
      skewX(-70deg)
      scale(2);
    text-shadow: 0 0 20px whitesmoke;
    opacity: 0;
  }
`;

const SmokyText = styled.div`
  display: inline-block;
  text-shadow: 0 0 0 whitesmoke;
  animation: ${({ flag }) => flag ? css`${smoky} 7s 0s both` : 'none'};
  &.hideText {
    visibility: hidden;
  }
  & span:nth-child(even) {
    animation-name: ${smokyMirror};
  }
  height: 100%;
  width: 100%;
  border-left: 0px;
  border-right: 0px;
  padding: 1rem;
  color: gray;
  background-color: rgba(0, 0, 0, 0);
  outline: none;
  resize: none;
  font-size: 1rem;
  margin-top: 20rem;
  font-family: "TAEBAEKmilkyway";
  // display: flex;
  // justify-content: center;
  // align-items: center;
`;

const InputContainer = styled.div`
  width: 80%;
  display: flex;
  align-items: center;
  position: relative;
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

const BlackHoleInput = ({ value, flag, placeholder }) => {
  const [showText, setShowText] = useState(true);

  return (
    <InputContainer>
      <SmokyText flag={flag} className={showText ? "" : "hideText"} >
        {value.split("").map((char, index) => (
          <span key={index}>{char}</span>
        ))}
      </SmokyText>
      <SendButton>
        <i className="fas fa-paper-plane"></i>
      </SendButton>
    </InputContainer>
  );
};

export default BlackHoleInput;
