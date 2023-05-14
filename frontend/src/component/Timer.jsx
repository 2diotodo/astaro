import { useState, useEffect, useMemo } from "react";
import styled from "styled-components";

const Times = styled.div`
  position: relative;
  color: white;
  font-size: 30px;
  margin: 1% 0 1% 0;
`;

function Timer({
  onSaveTime,
  gameOver,
  formatElapsedTime,
}) {

  const [elapsedTime, setElapsedTime] = useState(0);


  useEffect(() => {
    let interval;
    if (!gameOver) {
      interval = setInterval(() => {
        setElapsedTime((prevElapsedTime) => prevElapsedTime + 100);
      }, 100);
    }
    return () => {
      clearInterval(interval);
    };
  }, [gameOver]);

  useEffect(() => {
    if (gameOver) {
      onSaveTime(elapsedTime);
    }
  }, [elapsedTime, onSaveTime, gameOver]);

  return <Times>{formatElapsedTime(elapsedTime)}</Times>;
}

export default Timer;
