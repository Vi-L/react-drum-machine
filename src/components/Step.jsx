import React from "react"

const Step = ({text, current, toggleSwitch}) => {
  const [active, setActive] = React.useState(false)
  const handleClick = (event) => {
    setActive(active => !active)
    toggleSwitch()
  }
  return (
    <div 
      className={"step" + (current ? " step-current":"") + (active ? " step-active":"")}
      onClick={handleClick} 
      >
      {text}
    </div>
  )
}

export default Step