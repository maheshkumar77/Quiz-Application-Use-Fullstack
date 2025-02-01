import React, { useEffect, useState } from 'react';
import { MdOutlineTimer } from "react-icons/md";
import '../style/timer.css'
const Timer = ({ timeLeft }) => {
  const [time, setTime] = useState(timeLeft);

  useEffect(() => {
    if (time > 0) {
      const timerInterval = setInterval(() => setTime((prevTime) => prevTime - 1), 1000);
      return () => clearInterval(timerInterval);
    }
  }, [time]);

  return <div className='timer'>Time Left: {time} seconds <MdOutlineTimer/> </div>;
};

export default Timer;
