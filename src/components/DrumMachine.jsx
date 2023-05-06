import React from "react"
import useAnimationFrame from "../hooks/useAnimationFrame"
import Step from "./Step"



let sounds = ["https://upload.wikimedia.org/wikipedia/commons/4/44/Bongo_Grave.ogg", 
               "https://upload.wikimedia.org/wikipedia/commons/7/7f/Bombo_Ac%C3%BAstico.ogg", 
               "https://upload.wikimedia.org/wikipedia/commons/7/7c/Bombo_Leg%C3%BCero_Grave.ogg"]

function playSound(time, audioContext) {
  var osc = audioContext.createOscillator();
  // osc.connect(audioContext.destination)
  osc.frequency.value = 200;
  osc.start(time);
  osc.stop(time + 0.1);
  
  var gainNode = audioContext.createGain()
  gainNode.gain.value = 0.1 // 10 %
  gainNode.connect(audioContext.destination)
  osc.connect(gainNode)
};

async function loadSample(audioContext) {
  const response = await fetch(sounds[0])
  const arrayBuffer = await response.arrayBuffer();
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
  return time => {
    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioContext.destination);
    source.start(time);
  };
}

const DrumMachine = ({audioContext}) => {
  const steps = 16
  // const [step, setStep] = React.useState(0)
  const [step, setStep] = React.useState(Math.floor(audioContext.currentTime) % steps);
  const stepRef = React.useRef(step)
  const nextNoteTimeRef = React.useRef(audioContext.currentTime)
  const [BPM, setBPM] = React.useState(120)
  const timeBetweenStepsRef = React.useRef(60 / BPM / 4)
  const switches = React.useRef( Array(steps).fill(false) )
  
  useAnimationFrame(deltaTime => {
    // Pass on a function to the setter of the state
    // to make sure we always have the latest state
    
    schedule()
  })
  
  function schedule() {
    if (nextNoteTimeRef.current < audioContext.currentTime + 0.1) {
        // Greg says: it turns out that keeping this separate avoids
        //  a nasty noise when the window focus is lost 
        //  because too many samples stack up on each other
        setStep(prevStep => (prevStep + 1) % steps)
        stepRef.current = (stepRef.current + 1) % steps
    }
    
    while(nextNoteTimeRef.current < audioContext.currentTime + 0.1) {
        nextNoteTimeRef.current += timeBetweenStepsRef.current;
        if (switches.current[stepRef.current]) {
          // playSound(nextNoteTimeRef.current, audioContext);
          loadSample(audioContext).then(async scheduleSample => {
             // Greg: see https://stackoverflow.com/questions/55026293/google-chrome-javascript-issue-in-getting-user-audio-the-audiocontext-was-not
             // I'm still a bit perplexed as to why your app needs 
             // this but mine doesn't, but it seems to solve the problem?
            await audioContext.resume();
            scheduleSample(nextNoteTimeRef.current)
          });
        }
    }
};
    
  return (
    <div className="drum-machine">
    <div>{(step)}</div>
    {Array(steps).fill().map((el, index) => 
      <Step current={index === step} text={index + 1} key={index} 
        toggleSwitch={() => {
          // setSwitches(prevState => {
          //   let prevStateCopy = prevState.slice()
          //   prevStateCopy[index] = !prevStateCopy[index]
          //   return prevStateCopy
          // })
            switches.current[index] = !switches.current[index]
        }}/>
    )}
    </div>
  )
}

export default DrumMachine
