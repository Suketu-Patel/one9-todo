import React, {useState, useEffect} from 'react';

function Timer() {
  const [timer, setTimer] = useState(0);
  useEffect(() => {
    let id = setInterval(() => {
      setTimer(timer + 1);
    }, 1000);
    return clearInterval(id); 
  }, [timer])
  return(
    <div>
      {timer}
    </div>
  )
}

export default Timer;