function Dice({num,isLocked,toggle}){

// function roll(){
//   num = Math.floor(Math.random()*6) 

// }
// function lock(){
//   num = Math.floor(Math.random()*6) 
// }
    return(
        <>
          <button 
          onClick={toggle}
          style={{
           width:"50px",
           height:"50px",
           fontSize:"30px",
             backgroundColor: isLocked ? "yellow" : "white" ,
             margin:"10px"
          }}>{num}</button>
          
         
        </>
    )
}

export default Dice