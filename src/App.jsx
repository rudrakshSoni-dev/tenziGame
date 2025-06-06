import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Dice from "./components/Dice";
import "./App.css";

function App() {
 
  const initialDice = Array.from({ length: 10 }, () => ({
  value: 1 + Math.floor(Math.random() * 6),
  isLocked: false
}))

const [diceArray,setDiceArray] = useState(initialDice)
const [targetNum,setTargetNum] = useState(null)
const [won,setWon] = useState(false)
const [count,setCount] = useState(0)
const [isRunning,setIsRunning] = useState(true)
const [time, setTime] = useState(0);

  function roll(){
    setDiceArray(prev => prev.map(d=> d.isLocked? d : {...d, value: 1+ Math.floor(Math.random()*6 )}))
    setCount(count+1)
  }

 function toggle(index) {
    
  setDiceArray(prev =>
    prev.map((d, i) =>
{
  if(i !== index) return d ;

  if(targetNum === null ) {
    setTargetNum(d.value);
    return{...d,isLocked : true}
  }
  if(d.value === targetNum) {
    return{...d, isLocked: !d.isLocked}
  }

  return d ;
}
    )
  );

}
function restart(){
  setCount(0)
  setDiceArray(initialDice)
  setWon(false)
  setTargetNum(null)
  setTime(0)
  setIsRunning(true)
}

useEffect(()=>{
  const allLocked = diceArray.every((d)=> d.isLocked );
  const allSame = diceArray.every((d)=> d.value === targetNum);
  if(allLocked && allSame && targetNum !== null){
    setWon(true);
    setIsRunning(false);
  }
}
,[diceArray,targetNum]
)

useEffect(() => {
  let interval;
  if (isRunning) {
    interval = setInterval(() => {
      setTime(prev => prev + 1);
    }, 1000);
  }

  return () => clearInterval(interval); // Cleanup on unmount
}, [isRunning]);

  return (
    <>
    
   {
    diceArray.map((dice,index)=>(
      <Dice 
      key={index}
      num={dice.value}
      isLocked={dice.isLocked}
      toggle={()=>{toggle(index)}}
      />
    ))
   }
  

  {
    won ? <div
    style={{backgroundColor:"",
      color:"white",
      width:"100px",
      height:"40px",
      textAlign:"center",
      display:"flex",
      justifyContent:"center",
      alignItems:"center"
    }}>
      You Won
      </div> : null
  }
  {
     !won? <button className="roll-dice-btn"
          onClick={roll}
          style={{
            margin:"40px",
            backgroundColor:"blue",
            color:"white"
          }}>
    roll dice
          </button>

 : <button className="roll-dice-btn"
          onClick ={restart}
          style={{
            
            margin:"40px",
            backgroundColor:"blue",
            color:"white"
          }}>
    New Game
          </button>
  }
   <div className="counter">
    <p>{count}</p>
   </div>

<h2 style={{ color: "green" }}>⏱️ Time: {time}s</h2>

    </>
  )
}

export default App;
