import React, { useState, useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import BlackHoleInput from '@/component/shootingStar/BlackHoleInput';
import { AiOutlineSend, AiOutlineAudio } from "react-icons/ai";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import WaveSurfer from 'wavesurfer.js';
import MicrophonePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.microphone.min.js';

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Container = styled.div`
  height: 100vh;
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
    width: 100vh;
    height: 100%;
    position: absolute;
    z-index: 0;
    animation: ${rotate} 10s linear infinite;
  }
`;

const Title = styled.h1`
  color: white;
  margin-bottom: 1rem;
  z-index: 1;
`;

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;

const SendButton = styled.button`
  z-index: 1;
  background: none;
  border: none;
  cursor: pointer;
  color: white;
  font-size: 1.5rem;
  margin-top: 1rem;
  display: flex;
  align-items: center;
`;


const SendText = styled.span`
  margin-left: 0.5rem;
  font-size: 1rem;
`;

const SendButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
	margin-right: 5rem;
`;

const AudioButton = styled.button`
  z-index: 1;
  background: none;
  border: none;
  cursor: pointer;
  color: ${props => props.recording ? "red" : "white"};
  font-size: 1.5rem;
  margin-top: 1rem;
  display: flex;
  align-items: center;
`;

const Visualizer = styled.div`
  width: 100%;
  height: 40px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: #ffffff;
`;

const BlackHolePage = () => {
  const [recording, setRecording] = useState(false);
  const { transcript, listening } = useSpeechRecognition();
  const visualizerRef = useRef(null);
  const wavesurferRef = useRef(null);

  useEffect(() => {
    if (recording) {
      wavesurferRef.current = WaveSurfer.create({
        container: visualizerRef.current,
        waveColor: 'white',
        progressColor: 'white',
        cursorWidth: 0,
        interact: false,
        plugins: [MicrophonePlugin.create()]
      });
      wavesurferRef.current.microphone.start();
    } else {
      if (wavesurferRef.current) {
        wavesurferRef.current.microphone.stop();
        wavesurferRef.current.destroy();
      }
    }
  
    return () => {
      if (wavesurferRef.current) {
        wavesurferRef.current.microphone.stop();
        wavesurferRef.current.destroy();
      }
    };
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

  return (
    <Container>
      <Title>블랙홀</Title>
      <InputContainer>
        {recording ? (
          <Visualizer ref={visualizerRef} />
        ) : (
          <BlackHoleInput value={transcript} placeholder="여기에 고민을 적어주세요..." />
        )}
      </InputContainer>
      <SendButtonContainer>
        <AudioButton recording={recording} onClick={toggleRecording}>
          <AiOutlineAudio />
        </AudioButton>
        <SendButton>
          <AiOutlineSend />
          <SendText>Send</SendText>
        </SendButton>
      </SendButtonContainer>
    </Container>
  );
};

export default BlackHolePage;