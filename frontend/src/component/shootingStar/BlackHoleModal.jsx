import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styled, { keyframes } from "styled-components";
import Button from "@component/Button"
import { useNavigate } from 'react-router-dom';

const FadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
    filter: blur(0);
  }
`;

const Text = styled.span`
  color: white;
  animation: ${FadeIn} 2.5s ${(props) => props.delay}s linear forwards;
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const SubTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;

  margin-bottom: 1rem;
  width: 80%;

  & > span {
    opacity: 0;
    filter: blur(4);
    font-size: 20px;
    font-weight: 700;
    color: white;
  }
`;

const DelayedButton = styled(Button)`
	opacity: 0;
  animation: ${FadeIn} 2.5s ${(props) => props.delay}s linear forwards;
`;

const BlackHoleModal = ({ delay }) => {
	const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

	function goToHome(){
			navigate("/home");
	}

	useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000); // 3초 후에 모달이 보여짐

    // cleanup function
    return () => {
      clearTimeout(timer);
    };
  }, []);

	if (!isVisible) {
    return null; // 모달이 보이지 않는 동안에는 null을 반환
  }


  return ReactDOM.createPortal(
    <ModalContainer>
    	<SubTitle>
        <Text delay={1}>이제</Text>
        <Text delay={2}>모든 </Text>
        <Text delay={3}>고민은 </Text>
        <Text delay={4}>사라져씀</Text>
      </SubTitle>
			<SubTitle>
        <Text delay={5}>집에</Text>
        <Text delay={6}>가서</Text>
        <Text delay={7}>잠이나</Text>
        <Text delay={8}>주무셔요</Text>
    	</SubTitle>
			<SubTitle>
				<DelayedButton delay={9} onClick={goToHome} style={{position:"relative"}}>홈으로 가기</DelayedButton>
			</SubTitle>
    </ModalContainer>,
    document.getElementById('modal-root')
  );
};

export default BlackHoleModal;
