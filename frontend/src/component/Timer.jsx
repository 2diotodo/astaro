import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const Times = styled.div`
  position: relative;
  color: white;
  font-size: 40px;
  margin: 1% 0 1% 0;
`;

function Timer({ onSaveTime }) {
  const [startTime, setStartTime] = useState(new Date());
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalRef = useRef();

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setElapsedTime(Date.now() - startTime.getTime());
    }, 1000);
    return () => {
      clearInterval(intervalRef.current);
    };
  }, [startTime]);

  useEffect(() => {
    onSaveTime(elapsedTime);
  }, [elapsedTime, onSaveTime]);

  const handleReset = () => {
    setStartTime(new Date());
    setElapsedTime(0);
  };

  const formatTime = (time) => {
    const hours = Math.floor(time / (1000 * 60 * 60));
    const minutes = Math.floor(time / (1000 * 60)) % 60;
    const seconds = Math.floor(time / 1000) % 60;
    const milliseconds = time % 1000;
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}.${
      milliseconds < 10 ? '00' : milliseconds < 100 ? '0' : ''
    }${milliseconds}`;
  };

  return <Times>Elapsed time: {formatTime(elapsedTime)}</Times>;
}

export default Timer;
