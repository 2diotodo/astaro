import music from "@assets/keys-of-moon-lullaby.mp3";
import music2 from "@assets/A_Quiet_Thought-Wayne_Jones.mp3";
import { Howl, Howler } from "howler";

function AudioPlayer() {
  const sound = new Howl({
    src: [{ music2 }],
  });

  sound.play();

  //global volume.
  Howler.volume(0.5);

  return (
    <>
      <audio controls autoPlay>
        {/* <source src={music} type="audio/mp3"></source> */}
        <source src={music2} type="audio/mp3"></source>
        browser does not support.
      </audio>
    </>
  );
}

export default AudioPlayer;
