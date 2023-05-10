import music2 from "@assets/A_Quiet_Thought-Wayne_Jones.mp3";
import { BsPlayFill, BsPauseFill } from "react-icons/bs";

function AudioPlayer() {
  const audio = new Audio(music2);
  audio.loop = true;

  return (
    <>
      <BsPlayFill
        color="white"
        onClick={() => {
          audio.loop = true;
          audio.play();
        }}
      />
      <BsPauseFill
        color="white"
        onClick={() => {
          audio.pause();
        }}
      />
    </>
  );
}

export default AudioPlayer;
