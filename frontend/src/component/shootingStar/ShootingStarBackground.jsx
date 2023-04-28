import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const shootingTime = '7000ms';

const ShootingStarsContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
	// shooting star 각도
  transform: rotateZ(40deg);

  .shooting_star {
    position: absolute;
    left: 10%;
    // top: 20%;
    height: 1px;
    background: linear-gradient(-45deg, rgba(95, 145, 255, 1), rgba(0, 0, 255, 0));
    // border-radius: 1000px;
    filter: drop-shadow(0 0 6px rgba(105, 155, 255, 1));
    animation: tail ${shootingTime} ease-in-out infinite, shooting ${shootingTime} ease-in-out infinite;
  }

  .shooting_star::before,
  .shooting_star::after {
    content: '';
    position: absolute;
    right: 0;
    height: 2px;
    background: linear-gradient(-45deg, rgba(0, 0, 255, 0), rgba(95, 145, 255, 1), rgba(0, 0, 255, 0));
    transform: translateX(50%) rotateZ(45deg);
    border-radius: 100%;
    animation: shining ${shootingTime} ease-in-out infinite;
  }

  .shooting_star::after {
    transform: translateX(50%) rotateZ(-45deg);
  }

  @keyframes tail {
    0% {
      width: 30px;
    }
    50% {
      width: 100px;
    }
    100% {
      width: 0;
    }
  }

  @keyframes shining {
    0% {
      width: 20px;
    }
    50% {
      width: 50px;
    }
    100% {
      width: 20px;
    }
  }

  @keyframes shooting {
    0% {
      transform: translateX(-100px);
    }
    100% {
      transform: translateX(500px);
    }
  }
`;


const ShootingStars = () => {
  // const navigate = useNavigate();

  // const navigateToChat = () => {
  //   navigate("/star/chat/1");
  // }

  const navigate = useNavigate();

  // API 요청 함수
  const fetchTaroResult = async (memberSeq) => {
    const response = await fetch(`http://localhost:8082/api/v1/star/${memberSeq}`);
    if (!response.ok) {
      // 응답 상태 코드가 200 범위에 없으면 에러 발생
      throw new Error(`API request failed with status ${response.status}`);
    }
    const data = await response.json();
    return data;
  };  

  const handleStarClick = async () => {
    const memberSeq = 1; // 실제 사용자 ID로 교체해야 함
    try {
      const taroResultDto = await fetchTaroResult(memberSeq);
      navigate("/star/taro-result", { state: { taroResult: taroResultDto } });
    } catch (error) {
      console.error('Error fetching taro result:', error);
    }
  };  

  const stars = Array.from({ length: 30 }, (_, i) => {
    const top = Math.floor(Math.random() * 100);
    const left = Math.floor(Math.random() * 100);
    const delay = Math.floor(Math.random() * 10000);

    return (
      <div
        onClick={handleStarClick}
        key={i}
        className="shooting_star"
        style={{
          top: `${top}%`,
          left: `${left}%`,
          animationDelay: `${delay}ms`,
        }}
      />
    );
  });

  return <ShootingStarsContainer>{stars}</ShootingStarsContainer>;
};

export default ShootingStars;