import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchTaroResult } from "@/features/shootingStarSlice/starSlice";

const shootingTime = "1000ms";

const getRandomDuration = () => {
  const minDuration = 5000;
  const maxDuration = 20000;
  return Math.floor(
    Math.random() * (maxDuration - minDuration + 1) + minDuration
  );
};

const ShootingStarsContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  transform: rotateZ(30deg);
  z-index: 5;

  .shooting_star {
    position: absolute;
    left: 10%;
    height: 1px;
    background: linear-gradient(
      -45deg,
      rgba(255, 255, 255, 1),
      rgba(255, 255, 255, 0)
    );
    filter: drop-shadow(0 0 6px lightyellow);
    animation: tail linear infinite, shooting linear infinite;
  }

  .shooting_star::before,
  .shooting_star::after {
    content: "";
    position: absolute;
    right: 0;
    height: 2px;
    background: linear-gradient(
      -45deg,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 1),
      rgba(255, 255, 255, 0)
    );
    transform: translateX(50%) rotateZ(45deg);
    border-radius: 100%;
    animation: shining ${shootingTime} ease-in-out infinite;
  }

  .shooting_star::after {
    transform: translateX(50%) rotateZ(-45deg);
  }

  animation-play-state: ${(props) => (props.paused ? "paused" : "running")};

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
      width: 30px;
    }
    100% {
      width: 20px;
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

const ShootingStars = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [stars, setStars] = useState([]);

  useEffect(() => {
    const createStars = () => {
      return Array.from({ length: 60 }, (_, i) => {
        const top = Math.floor(Math.random() * 90);
        const left = Math.floor(Math.random() * 50);
        const delay = 0
        const duration = getRandomDuration();

        return (
          <div
            onMouseOver={(e) => e.currentTarget.style.animationPlayState = 'paused'}
            onMouseOut={(e) => e.currentTarget.style.animationPlayState = 'running'}
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
  }, []);

  const handleStarClick = async () => {
    try {
      const taroResultAction = dispatch(fetchTaroResult());
      const taroResultDto = taroResultAction.payload;
      navigate("/star/taro-story", { state: { taroResult: taroResultDto } });
    } catch (error) {
      console.error("Error fetching taro result:", error);
    }
  };

  return <ShootingStarsContainer>{stars}</ShootingStarsContainer>;
};

export default ShootingStars;
