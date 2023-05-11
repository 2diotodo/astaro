import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Fade = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 100;
  background-color: #fff;
  animation: fade 2s forwards;
  @keyframes fade {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;

const shootingTime = "1000ms";

const getRandomDuration = () => {
  const minDuration = 6000; // 최소 지속 시간(ms)
  const maxDuration = 20000; // 최대 지속 시간(ms)
  return Math.floor(
    Math.random() * (maxDuration - minDuration + 1) + minDuration
  );
};

const ShootingStarsContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  // shooting star 각도
  transform: rotateZ(30deg);
  z-index: 101;

  .shooting_star {
    position: absolute;
    left: 10%;
    height: 1px;
    background: linear-gradient(-45deg, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
    filter: drop-shadow(0 0 6px lightyellow);
    animation: tail linear infinite, shooting linear infinite; // 여기서 'shootingTime' 변수를 제거했습니다.
  }

  .shooting_star::before,
  .shooting_star::after {
    content: "";
    position: absolute;
    right: 0;
    height: 2px;
    background: linear-gradient(
      -45deg,
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 1),
      rgba(0, 0, 0, 0)
    );
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
      transform: translateX(-100px) rotateX(0deg);
    }
    100% {
      transform: translateX(500px) rotateX(3600deg);
    }
  }
`;
function TodayTarotFade() {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const createStars = () => {
      return Array.from({ length: 20 }, (_, i) => {
        const top = Math.floor(Math.random() * 100);
        const left = Math.floor(Math.random() * 100);
        const duration = getRandomDuration();

        return (
          <div
            key={i}
            className="shooting_star"
            style={{
              top: `${top}%`,
              left: `${left}%`,
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
  }, []);
  return (
    <Fade>
      <ShootingStarsContainer>{stars}</ShootingStarsContainer>
    </Fade>
  );
}

export default TodayTarotFade;
