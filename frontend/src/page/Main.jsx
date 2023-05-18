// Library Import
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";

// Icons or Component Import
import { MdArrowLeft, MdArrowRight } from "react-icons/md";
import CardNav from "../component/CardNav.js";

const TextFadeIn = keyframes`
  from {
    opacity: 0;
    filter: blur(22px);
  }
  to {
    opacity: 1;
    filter: blur(0);
  }
`;

const FadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Scale = keyframes`
  100% {
    transform: scale(1);
  }
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: center;

  width: 100%;
  height: 30%;
`;
// transform: translateY(125%);
// animation: ${Slide} 0.6s 1.8s linear forwards;
const Title = styled.div`
  margin: 5px;
  transform: scale(0.94);
  font-size: 56px;
  font-weight: 900;
  color: white;
  animation: ${Scale} 0.1s forwards cubic-bezier(0.5, 1, 0.89, 1);
`;

// animation: ${Scale} 0.1s forwards cubic-bezier(0.5, 1, 0.89, 1);
const Subtitle = styled.div`
  margin: 5px;
  transform: scale(0.94);
  font-size: 20px;
  font-weight: 500;
  color: white;
  animation: ${Scale} 0.1s forwards cubic-bezier(0.5, 1, 0.89, 1);
`;

const TextStyle = styled.span`
  opacity: 0;
  animation: ${TextFadeIn} 1s linear forwards;
`;

const NavContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;

  width: 100%;
  max-width: 800px;
  height: 60%;
  margin-top: 15%;
  opacity: 0;

  background-color: transparent;
  animation: ${FadeIn} 1s 1s linear forwards;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;

  width: 100%;
  height: 100%;
`;

export function Main() {
  const navigate = useNavigate();
  const [activeCard, setActiveCard] = useState(0);

  return (
    <>
      <Wrapper>
        <TitleContainer>
          <Subtitle>
            <TextStyle>오늘도 별처럼 빛나는 당신에게</TextStyle>
          </Subtitle>
          <Title>
            <TextStyle>ASTARO</TextStyle>
          </Title>
        </TitleContainer>
        <NavContainer>
          <CardNav></CardNav>
        </NavContainer>
      </Wrapper>
    </>
  );
}
