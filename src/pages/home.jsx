import React from "react";
import DrumPad from "../components/DrumPad"
import DrumMachine from "../components/DrumMachine"

export default function Home() {
  const [showDrumMachine, setShowDrumMachine] = React.useState(false);
  const [audioContext, setAudioContext] = React.useState(null)
  //console.log(hello)
  const handleButtonClick = () => {
    setShowDrumMachine(true)
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    setAudioContext(new AudioContext())
  };
  
  
  return (
    <>
      { /** <button onClick={handleChangeHello}>Click</button>
      {sounds.map(sound => <DrumPad url={sound} />)} **/}
      { showDrumMachine ? <DrumMachine audioContext={audioContext}/> : <button onClick={handleButtonClick}> Click to start! </button> }
    </>
  );
}
