import React, { useEffect, useRef, useState } from 'react'
import { auth, db } from '../firebase'
import { useAuthState } from "react-firebase-hooks/auth"
import { collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import tomato from "../tomato.png"
import { BsFillCheckSquareFill } from "react-icons/bs"

const Settings = ({ userData, checkDocumentExists }) => {
  const [numbers, setNumbers] = useState([])


  const [user, loading] = useAuthState(auth)
  const focusTime = useRef(null);
  const breakTime = useRef(null);

  
  const focusTimeSettings = async () => {
    const focusTimeValue = parseFloat(focusTime.current.value)
    await updateDoc(doc(db, "users", user.uid), {
      focusTime: focusTimeValue,
    })
  }

  const breakTimeSettings = async () => {
    const breakTimeValue = parseFloat(breakTime.current.value)
    await updateDoc(doc(db, "users", user.uid), {
      breakTime: breakTimeValue,
    })
  }

  const generateRandomNumbers = () => {
    const count = userData.completedSessions; // Number of random numbers to generate

    const randomNumbers = [];
    for (let i = 0; i < count; i++) {
      const randomNumber = Math.floor(Math.random() * 100); // Generate a random number between 0 and 100
      randomNumbers.push(randomNumber);
    }

    setNumbers(randomNumbers);
  };

  useEffect(() => {
    generateRandomNumbers()
    checkDocumentExists()

  }, [userData])
  
  return (
    <div>
        {user ? <div>
          <h2>Settings</h2>
          <p>Logged in as: <span className='user-name'>{user.displayName}</span></p> 
          <span>Change Focus Time: </span><input style={{ display: 'inline-block', verticalAlign: 'middle' }} type='number' ref={focusTime} /><BsFillCheckSquareFill className='saveIcon' style={{ display: 'inline-block', verticalAlign: 'middle' }} onClick={focusTimeSettings} />
          <br />
          <br />
          <span>Change Break Time: </span><input style={{ display: 'inline-block', verticalAlign: 'middle' }} type='number' ref={breakTime} /><BsFillCheckSquareFill className='saveIcon' style={{ display: 'inline-block', verticalAlign: 'middle' }} onClick={breakTimeSettings} />
          <h3>Total Completed Sessions: {userData.completedSessions}</h3>
          {numbers.map((number, index) => {
            return <img alt='tomato' className='small-tomato' src={tomato} key={index} />
          })}
          <br />
          <button className='signout-button' onClick={() => auth.signOut()}>Logout</button>
          </div> : ""}
    </div>
  )
}

export default Settings