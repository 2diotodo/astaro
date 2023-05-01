import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useState, useEffect } from 'react';

const shootingTime = '1000ms';

const getRandomDuration = () => {
  const minDuration = 3000; // 최소 지속 시간(ms)
  const maxDuration = 20000; // 최대 지속 시간(ms)
  return Math.floor(Math.random() * (maxDuration - minDuration + 1) + minDuration);
};

const ShootingStarsContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
	// shooting star 각도
  transform: rotateZ(30deg);

  .shooting_star {
    position: absolute;
    left: 10%;
    height: 1px;
    background: linear-gradient(-45deg, rgba(95, 145, 255, 1), rgba(0, 0, 255, 0));
    filter: drop-shadow(0 0 6px rgba(105, 155, 255, 1));
    animation: tail linear infinite, shooting linear infinite; // 여기서 'shootingTime' 변수를 제거했습니다.
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
      width: 30px;
    }
    50% {
      width: 30px;
    }
    100% {
      width: 30px;
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
const updateStar = (star) => {
  const top = Math.floor(Math.random() * 100);
  const left = Math.floor(Math.random() * 100);
  const delay = Math.floor(Math.random() * 10000);
  const duration = getRandomDuration();

  return React.cloneElement(star, {
    style: {
      ...star.props.style,
      top: `${top}%`,
      left: `${left}%`,
      animationDelay: `${delay}ms`,
      animationDuration: `${duration}ms`,
    },
  });
};

const ShootingStars = () => {
  const navigate = useNavigate();
  
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const createStars = () => {
      return Array.from({ length: 20 }, (_, i) => {
        const top = Math.floor(Math.random() * 100);
        const left = Math.floor(Math.random() * 100);
        const delay = Math.floor(Math.random() * 10000);
        const duration = getRandomDuration();
        
        return (
          <div
            onClick={handleStarClick}
            key={i}
            className="shooting_star"
            style={{
              top: `${top}%`,
              left: `${left}%`,
              animationDelay: `${delay}ms`,
              animationDuration: `${duration}ms`,
            }}
          />
        );
      });
    };

    setStars(createStars());
    const interval = setInterval(() => {
      setStars(createStars());
    }, 15000);

    return () => {
      clearInterval(interval);
    };
  }, []);

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

  return <ShootingStarsContainer>{stars}</ShootingStarsContainer>;
};

export default ShootingStars;