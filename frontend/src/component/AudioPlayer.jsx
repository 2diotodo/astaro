import music2 from "@assets/A_Quiet_Thought-Wayne_Jones.mp3";
import { BsPlayFill, BsPauseFill } from "react-icons/bs";

function AudioPlayer() {
  const audio = new Audio(music2);

  return AudioPlayer.audio;
}

export default AudioPlayer;
