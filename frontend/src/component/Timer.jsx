import { useState, useEffect, useMemo } from "react";
import styled from "styled-components";

const Times = styled.div`
  position: relative;
  color: white;
  font-size: 30px;
  margin: 1% 0 1% 0;
`;

function Timer({
  startTime,
  onSaveTime,
  gameOver,
  formatElapsedTime,
  timeElapsed,
}) {
  const isoStartTime = useMemo(() => new Date(startTime), [startTime]);

  const [elapsedTime, setElapsedTime] = useState(0);

  const getRunningTime = (start) => {
    const current = new Date().getTime();
    const elapsed = current - start.getTime();
    timeElapsed = elapsed;
    return elapsed;
  };

  const runningTime = useMemo(
    () => getRunningTime(isoStartTime),
    [isoStartTime]
  );

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
      const formattedTime = formatElapsedTime(elapsedTime);
      console.log("formattedtime", formattedTime);
      onSaveTime(elapsedTime);
    }
  }, [elapsedTime, onSaveTime, gameOver]);

  return <Times>{formatElapsedTime(elapsedTime)}</Times>;
}

export default Timer;
