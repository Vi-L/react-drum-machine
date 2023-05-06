// https://stackoverflow.com/questions/47686345/playing-sound-in-react-js
import React from "react"

const useAudio = url => {
  const [audio] = React.useState(new Audio(url));
  const [playing, setPlaying] = React.useState(false);

  const toggle = () => setPlaying(!playing);

  React.useEffect(() => {
      playing ? audio.play() : audio.pause();
    },
    [playing]
  );

  React.useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false));
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false));
    };
  }, []);

  return [playing, toggle];
};

export default useAudio