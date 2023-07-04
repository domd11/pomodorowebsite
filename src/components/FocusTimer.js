import { doc, updateDoc } from 'firebase/firestore';
import React, { useState, useEffect, useRef } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { FaRegCirclePlay, FaRegCirclePause, FaArrowRotateRight, FaRegCircleXmark } from "react-icons/fa6"
import { auth, db } from '../firebase';
const Timer = ({ setFocusTimerStart, setFocusSessionCompleted, focusSessionCompleted, userData, checkDocumentExists }) => {
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);
  const [time, setTime] = useState(null)
  const [user, loading] = useAuthState(auth)
  const [countdown, setCountdown] = useState(null); // 10 minutes in seconds


  const checkIfUser = () => {
    if (user) {
      setCountdown(userData.focusTime * 60)
    } else {
      setCountdown(60)
    }
  }
  

  useEffect(() => {
    if (countdown === 0) {
      clearInterval(intervalRef.current);
        setFocusTimerStart(false);
        setFocusSessionCompleted(focusSessionCompleted + 1)

        updateDoc(doc(db, "users", user.uid), {
          completedSessions: userData.completedSessions+1,
        })

        checkDocumentExists()


        // await updateDoc(doc(db, "users", user.uid), {
        //   focusTime: focusTimeValue,
        // })
      
    }
  }, [countdown]);

useEffect(() => {
      checkIfUser();
}, [])

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
    setCountdown(time);
    setIsPaused(false);
  }

  const close = () => {
    setFocusTimerStart(false)
  }

  const formatTime = time => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div>
    <h3>Focus Timer</h3>
      <p className='timer'>{formatTime(countdown)}</p>

        {isPaused ? <FaRegCirclePlay className='icon' onClick={handlePause} /> : <FaRegCirclePause className='icon' onClick={handlePause} />}
        <FaArrowRotateRight className='icon' onClick={restart} />
        <FaRegCircleXmark className='icon' onClick={close} />
            
    </div>
  );
};

export default Timer;
