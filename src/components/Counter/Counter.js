import React, {useState} from 'react';

function Counter() {
  const [counter, setCounter] = useState(0);
  return(
    <div onClick={() => setCounter(counter + 1 )}>
      {counter}
    </div>
  )
}

export default Counter;