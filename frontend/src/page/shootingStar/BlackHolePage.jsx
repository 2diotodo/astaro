import React, { useState, useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import BlackHoleInput from '@/component/shootingStar/BlackHoleInput';
import { AiOutlineSend, AiOutlineAudio } from "react-icons/ai";
import SpeechRecognition, { useSpeechRecognition as useRecognition1 } from 'react-speech-recognition';
import { useSpeechRecognition } from 'react-speech-kit';
import { css } from 'styled-components';

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Container = styled.div`
  height: 90vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;

  &:before {
    content: '';
    background-image: url('/img/blackhole.png');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    width: 100%;
    height: 60vh;
    position: absolute;
    z-index: 5;
    animation: ${rotate} ${props => props.sendClicked ? '5s' : '30s'} linear infinite;
  }
`;

const Title = styled.h1`
  color: white;
  width: 100%;
  height: 20%;
  // margin-bottom: 1rem;
  z-index: 5;
`;

const InputContainer = styled.div`
  width: 100%;
  height: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 5;
  animation: ${props => props.sendClicked ? css`${disappear} 5s ease-in-out forwards, ${rotate} 3s linear infinite` : 'none'};
`;

const SendButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: white;
  font-size: 1.5rem;
  margin-top: 1rem;
  display: flex;
  align-items: center;
  z-index: 5;
`;

const SendText = styled.span`
  margin-left: 0.5rem;
  font-size: 1rem;
`;

const SendButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  height: 20%;
	margin-right: 5rem;
`;

const AudioButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${props => props.recording ? "red" : "white"};
  font-size: 1.5rem;
  margin-top: 1rem;
  display: flex;
  align-items: center;
  z-index: 5;
`;

const Visualizer = styled.div`
  width: 100%;
  height: 20%;
  background: rgba(255, 255, 255, 0);
  // border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  // font-weight: bold;
  // color: #ffffff;
`;

const Unvisualizer = styled.div`
  width: 100%;
  height: 28%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const disappear = keyframes`
  0% {
    // opacity: 1;
    // transform: scale(1);
    // font-size: 1.5rem;
  }
  100% {
    // opacity: 0;
    // transform: scale(0.5);
    // font-size: 0.5rem;
  }
`;

const BlackHolePage = () => {
  const [value, setValue] = useState("여기에 고민을 털어주세요...");
  const [recording, setRecording] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const { listen, stop } = useSpeechRecognition({
    onResult: (result) => {
      setValue(prevValue => prevValue + " " + result);
    },
  });
  
  const { transcript, listening } = useRecognition1();
  const visualizerRef = useRef(null);
  const canvasRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const bufferLengthRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
  
    const drawWave = () => {
      if (!analyserRef.current || !canvasRef.current) return;
    
      const canvas = canvasRef.current;
      const canvasCtx = canvas.getContext('2d');
      const dataArray = new Uint8Array(bufferLengthRef.current);
    
      analyserRef.current.getByteTimeDomainData(dataArray);
    
      canvasCtx.fillStyle = 'rgba(255, 255, 255, 0.3)'; // 투명 배경
      canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
      canvasCtx.lineWidth = 3;
    
      const getRandomRGB = () => 'rgba(255, 255, 255, 0.8)';
    
      canvasCtx.strokeStyle = getRandomRGB();
      canvasCtx.beginPath();
    
      const sliceWidth = (canvas.width * 1) / bufferLengthRef.current;
      let x = 0;
    
      for (let i = 0; i < bufferLengthRef.current; i++) {
        const v = dataArray[i] / 128.0;
        const y = v * canvas.height / 2;
    
        if (i === 0) {
          canvasCtx.moveTo(x, y);
        } else {
          canvasCtx.lineTo(x, y);
        }
    
        x += sliceWidth;
      }
    
      canvasCtx.lineTo(canvas.width, canvas.height);
      canvasCtx.stroke();
    
      requestAnimationFrame(drawWave);
    };
  
    if (recording) {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
          audioContextRef.current = new AudioContext();
          const source = audioContextRef.current.createMediaStreamSource(stream);
          analyserRef.current = audioContextRef.current.createAnalyser();
          analyserRef.current.fftSize = 2048;
          bufferLengthRef.current = analyserRef.current.frequencyBinCount;
  
          source.connect(analyserRef.current);
          drawWave();
        })
        .catch(err => {
          console.error('Error accessing audio stream:', err);
        });
    } else {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    }
  }, [recording]);
      

  const startRecording = () => {
    setRecording(true);
    SpeechRecognition.startListening({ continuous: true });
  };
  
  const stopRecording = () => {
    setRecording(false);
    SpeechRecognition.stopListening();
  };

  const toggleRecording = () => {
    if (listening) {
      stopRecording();
    } else {
      startRecording();
    }
  };


  const handleRecognitionToggle = () => {
    if (recording) {
      setRecording(false);
    } else {
      setRecording(true);
    }
    
    if (isListening) {
      setIsListening(false);
      stop();
    } else {
      setValue('');
      setIsListening(true);
      listen({ interimResults: false });
    }
  };
  
  const [sendClicked, setSendClicked] = useState(false);
  const [flag, setFlag] = useState(false);
  
  const sendMessage = (event) => {
    setSendClicked(true);
    setFlag(true);
  };

  return (
    <Container sendClicked={sendClicked}>
      <Title>블랙홀</Title>
      <InputContainer sendClicked={sendClicked}>
        <BlackHoleInput flag={flag} value={value} placeholder="여기에 고민을 털어주세요..." />
      </InputContainer>
      {recording ? (
          <Visualizer ref={visualizerRef}>
            <canvas ref={canvasRef} width="400" height="200" />
          </Visualizer>
        ) : (
            <Unvisualizer></Unvisualizer>
        )}
      <SendButtonContainer>
        <AudioButton recording={recording} onClick={handleRecognitionToggle}>
          <AiOutlineAudio />
        </AudioButton>
        <SendButton onClick={() => sendMessage()}>
          <AiOutlineSend />
          <SendText>Send</SendText>
        </SendButton>
      </SendButtonContainer>
    </Container>
  );
};

export default BlackHolePage;