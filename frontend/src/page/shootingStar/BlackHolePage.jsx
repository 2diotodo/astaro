import React, { useState, useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import BlackHoleInput from '@/component/shootingStar/BlackHoleInput';
import { AiOutlineSend, AiOutlineAudio } from "react-icons/ai";
import SpeechRecognition, { useSpeechRecognition as useRecognition1 } from 'react-speech-recognition';
import { useSpeechRecognition } from 'react-speech-kit';
import { css } from 'styled-components';
import BlackHoleModal from '@/component/shootingStar/BlackHoleModal';

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Container = styled.div`
  height: 80vh;
  width: 120vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;

  &:before {
    content: '';
    background-image: url('/img/blackhole.png');
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    width: 100%;
    height: 80vh;
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
  position: absolute;  // Position absolute
  top: 3rem;          // Stick to the bottom
`;

const InputContainer = styled.div`
  width: 100%;
  height: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 5;
  top: ${props => props.sendClicked ? '20%' : '50%'};
  transform: translateY(-50%);
  animation: ${props => props.sendClicked ? css`5s ease-in-out forwards, ${rotate} 3s linear infinite` : 'none'};
  position: absolute;  // Position absolute
  bottom: 0;          // Stick to the bottom
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
  height: 10%;
	margin-right: 5rem;
  position: absolute;
  bottom: 0;
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
  display: ${props => props.recording ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 3rem;
`;

const Unvisualizer = styled.div`
  width: 100%;
  height: 28%;
  display: flex;
  align-items: center;
  justify-content: center;
`;



const BlackHolePage = () => {
  const [value, setValue] = useState("평소 털어 놓지 못한 고민을 털어버리세요");
  const [recording, setRecording] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const { listen, stop } = useSpeechRecognition({
    onResult: (result) => {
      setValue(prevValue => prevValue + " " + result);
    },
  });

  const visualizerRef = useRef(null);
  const canvasRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const bufferLengthRef = useRef(null);

  const [isModalOpen, setModalOpen] = useState(false);
  

  const handleSendClick = () => {
    setRecording(false);
    setSendClicked(true);
    setModalOpen(true);
    setFlag(true);
  };

  useEffect(() => {
    if (!canvasRef.current) return;
  
    const drawWave = () => {
      if (!analyserRef.current || !canvasRef.current) return;
    
      const canvas = canvasRef.current;
      const canvasCtx = canvas.getContext('2d');
      const dataArray = new Uint8Array(bufferLengthRef.current);
    
      analyserRef.current.getByteTimeDomainData(dataArray);
    
      canvasCtx.fillStyle = 'rgba(255, 255, 255, 0.3)';
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

  const handleRecognitionToggle = () => {

  setRecording(!recording);
    
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

  return (
    <>
      <Container sendClicked={sendClicked}>
        <Title>블랙홀</Title>
        {isModalOpen && <BlackHoleModal delay={1.8} />}
        <InputContainer sendClicked={sendClicked}>
          <BlackHoleInput flag={flag} value={value}/>
        </InputContainer>
        {recording ? (
            <Visualizer recording={recording} ref={visualizerRef}>
              <canvas ref={canvasRef} width="800" height="200" />
            </Visualizer>
          ) : (
              <Unvisualizer></Unvisualizer>
          )}
      </Container>
        <SendButtonContainer>
          {/* {recording ? () : ()} */}
          <AudioButton recording={recording} onClick={handleRecognitionToggle}>
            <AiOutlineAudio />
            <SendText>녹음</SendText>
          </AudioButton>
          <SendButton onClick={handleSendClick}>
            <AiOutlineSend />
            <SendText>
              전송
            </SendText>
          </SendButton>
        </SendButtonContainer>
    </>
  );
};

export default BlackHolePage;