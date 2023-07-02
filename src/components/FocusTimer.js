import React, { useState, useEffect, useRef } from 'react';
import { FaRegCirclePlay, FaRegCirclePause, FaArrowRotateRight } from "react-icons/fa6"
const Timer = ({ setFocusTimerStart, setFocusSessionCompleted, focusSessionCompleted }) => {
    const initialCountdown = 60 * 60;
  const [countdown, setCountdown] = useState(initialCountdown); // 10 minutes in seconds
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (countdown === 0) {
      clearInterval(intervalRef.current);
        setFocusTimerStart(false);
        setFocusSessionCompleted(focusSessionCompleted + 1)

      
    }
  }, [countdown]);

  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setCountdown(prevCountdown => {
            if (prevCountdown === 0) {
                clearInterval(intervalRef.current);
                setFocusTimerStart(false);
              }
          return prevCountdown - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [isPaused]);

  const handlePause = () => {
    setIsPaused(prevIsPaused => !prevIsPaused);
  };

  const restart = () => {
    setCountdown(initialCountdown);
    setIsPaused(false);
  }

  const formatTime = time => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div>
      <p className='timer'>{formatTime(countdown)}</p>

        {isPaused ? <FaRegCirclePlay className='icon' onClick={handlePause} /> : <FaRegCirclePause className='icon' onClick={handlePause} />}
        <FaArrowRotateRight className='icon' onClick={restart} />
            
    </div>
  );
};

export default Timer;
