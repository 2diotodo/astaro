import React from 'react';
import styled from 'styled-components';

const shootingTime = '20000ms';

const ShootingStarsContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
	// shooting star 각도
  transform: rotateZ(45deg);

  .shooting_star {
    position: absolute;
    left: 10%;
    top: 50%;
    height: 1px;
    background: linear-gradient(-45deg, rgba(95, 145, 255, 1), rgba(0, 0, 255, 0));
    border-radius: 999px;
    filter: drop-shadow(0 0 6px rgba(105, 155, 255, 1));
    animation: tail ${shootingTime} ease-in-out infinite, shooting ${shootingTime} ease-in-out infinite;
  }

  .shooting_star::before,
  .shooting_star::after {
    content: '';
    position: absolute;
    // top: calc(50% - 1px);
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
      width: 10px;
    }
    50% {
      width: 20px;
    }
    100% {
      width: 10px;
    }
  }

  @keyframes shooting {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(500px);
    }
  }
`;

const ShootingStars = () => {
  const stars = Array.from({ length: 10 }, (_, i) => {
    const top = Math.floor(Math.random() * 100);
    const left = Math.floor(Math.random() * 100);
    const delay = Math.floor(Math.random() * 10000);

    return (
      <div
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
