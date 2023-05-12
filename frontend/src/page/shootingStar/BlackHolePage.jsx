import React, { useState, useRef, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import BlackHoleInput from "@/component/shootingStar/BlackHoleInput";
import { AiOutlineSend, AiOutlineAudio } from "react-icons/ai";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const shatterAnimation = keyframes`
  0% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(0);
  }
`;

const ShatteredText = styled.span`
  font-size: 36px;
  font-weight: bold;
  position: relative;
  display: inline-block;
  color: transparent;

  & .letter {
    display: inline-block;
    transform-origin: center center;
    animation: ${shatterAnimation} 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)
      both;
  }

  &.shatter-effect .letter {
    animation: ${shatterAnimation} 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)
      both;
  }
`;

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
    content: "";
    background-image: url("/img/blackhole.png");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    width: 100vh;
    height: 100%;
    position: absolute;
    z-index: 0;
    animation: ${rotate} 30s linear infinite;
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
  color: ${(props) => (props.recording ? "red" : "white")};
  font-size: 1.5rem;
  margin-top: 1rem;
  display: flex;
  align-items: center;
`;

const Visualizer = styled.div`
  width: 800px;
  height: 200px;
  // background: rgba(255, 255, 255, 0);
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: #ffffff;
`;

const BlackHolePage = () => {
  const textRef = useRef(null);

  const [recording, setRecording] = useState(false);
  const { transcript, listening } = useSpeechRecognition();
  const visualizerRef = useRef(null);
  const canvasRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const bufferLengthRef = useRef(null);

  // 문자 shattered disappear
  const handleButtonClick = () => {
    const text = textRef.current.value;
    console.log("들어오냐?", text);
    console.log("type?", typeof text);

    if (text) {
      text.innerHTML = text.textContent.replace(
        /\S/g,
        "<span class='letter'>$&</span>"
      );

      const letters = text.getElementsByClassName("letter");
      for (let i = 0; i < letters.length; i++) {
        letters[i].style.animationDelay = `${i * 0.05}s`;
      }

      text.classList.add("shatter-effect");
    }
  };

  // 음성 visualize
  useEffect(() => {
    if (!canvasRef.current) return;

    const drawWave = () => {
      if (!analyserRef.current || !canvasRef.current) return;

      const canvas = canvasRef.current;
      const canvasCtx = canvas.getContext("2d");
      const dataArray = new Uint8Array(bufferLengthRef.current);

      requestAnimationFrame(drawWave);
      analyserRef.current.getByteTimeDomainData(dataArray);

      canvasCtx.fillStyle = "rgba(255, 255, 255, 0.5)";
      canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
      canvasCtx.lineWidth = 2;
      canvasCtx.strokeStyle = "black";
      canvasCtx.beginPath();

      const sliceWidth = (canvas.width * 1.0) / bufferLengthRef.current;
      let x = 0;

      for (let i = 0; i < bufferLengthRef.current; i++) {
        const v = dataArray[i] / 128.0;
        const y = (v * canvas.height) / 2;

        if (i === 0) {
          canvasCtx.moveTo(x, y);
        } else {
          canvasCtx.lineTo(x, y);
        }

        x += sliceWidth;
      }

      canvasCtx.lineTo(canvas.width, canvas.height / 2);
      canvasCtx.stroke();
    };

    if (recording) {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          audioContextRef.current = new AudioContext();
          const source =
            audioContextRef.current.createMediaStreamSource(stream);
          analyserRef.current = audioContextRef.current.createAnalyser();
          analyserRef.current.fftSize = 2048;
          bufferLengthRef.current = analyserRef.current.frequencyBinCount;

          source.connect(analyserRef.current);
          drawWave();
        })
        .catch((err) => {
          console.error("Error accessing audio stream:", err);
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

  return (
    <Container>
      <Title>블랙홀</Title>
      <InputContainer>
        {recording ? (
          <Visualizer ref={visualizerRef}>
            <canvas ref={canvasRef} width="800" height="200" />
          </Visualizer>
        ) : (
          <BlackHoleInput
            value={transcript}
            textRef={textRef}
            placeholder="여기에 고민을 적어주세요..."
          />
        )}
      </InputContainer>
      <SendButtonContainer>
        <AudioButton recording={recording} onClick={toggleRecording}>
          <AiOutlineAudio />
        </AudioButton>
        <SendButton onClick={handleButtonClick}>
          <AiOutlineSend />
          <SendText>Send</SendText>
        </SendButton>
      </SendButtonContainer>
    </Container>
  );
};

export default BlackHolePage;
