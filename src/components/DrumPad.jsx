import React from "react"
import useAudio from "../hooks/useAudio"


const DrumPad = ({ url }) => {
  const [playing, toggle] = useAudio(url);

  return (
    <div>
      <button onClick={toggle}>{playing ? "Pause" : "Play"}</button>
    </div>
  );
};
export default DrumPad
