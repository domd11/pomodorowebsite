import React, { useState, useEffect, useRef } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { FaRegCirclePlay, FaRegCirclePause, FaArrowRotateRight, FaRegCircleXmark } from "react-icons/fa6"
import { auth } from '../firebase';

const BreakTimer = ({ setBreakTimerStart, userData }) => {
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);
  const [user, loading] = useAuthState(auth)
  const [time, setTime] = useState(10)
  const initialCountdown = time * 60;
  const [countdown, setCountdown] = useState(initialCountdown); // 10 minutes in seconds


  const checkIfUer = () => {
      if (user) {
        setCountdown(userData.breakTime * 60)
      } else {
        setCountdown(60)
      }
  }

  useEffect(() => {
    if (countdown === 0) {
      clearInterval(intervalRef.current);
        setBreakTimerStart(false);

      
    }
  }, [countdown]);

  useEffect(() => {
    checkIfUer()
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setCountdown(prevCountdown => {
            if (prevCountdown === 0) {
                clearInterval(intervalRef.current);
                setBreakTimerStart(false);
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
    setCountdown(time);
    setIsPaused(false);
  }

  const formatTime = time => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const close = () => {
    setBreakTimerStart(false)
  }
  return (
    <div>
    <h3>Break Timer</h3>
      <p className='timer'>{formatTime(countdown)}</p>

        {isPaused ? <FaRegCirclePlay className='icon' onClick={handlePause} /> : <FaRegCirclePause className='icon' onClick={handlePause} />}
        <FaArrowRotateRight className='icon' onClick={restart} />
        <FaRegCircleXmark className='icon'onClick={close} />
    </div>
  );
};

export default BreakTimer