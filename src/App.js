import { useEffect, useRef, useState } from 'react';
import './App.css';
import FocusTimer from './components/FocusTimer';
import {TbSettings, TbSettingsFilled} from "react-icons/tb"
import { useAuthState } from "react-firebase-hooks/auth"
import tomato from "./tomato.png"
import BreakTimer from './components/BreakTimer';
import { GoogleAuthProvider, signInWithPopup, signInWithRedirect } from 'firebase/auth';
import { auth, db } from './firebase';
import Settings from './components/Settings';
import { doc, getDoc, setDoc } from 'firebase/firestore';
function App() {
  const [numbers, setNumbers] = useState([]);
  const [focusTimerStart, setFocusTimerStart] = useState(false);
  const [focusSessionCompleted, setFocusSessionCompleted] = useState(0)
  const [breakTimerStart, setBreakTimerStart] = useState(false)
  const [toggleSettings, setToggleSettings] = useState(false)
  const [userData, setUserData] = useState([])
  const [user, loading] = useAuthState(auth)

  const generateRandomNumbers = () => {
    const count = focusSessionCompleted; // Number of random numbers to generate

    const randomNumbers = [];
    for (let i = 0; i < count; i++) {
      const randomNumber = Math.floor(Math.random() * 100); // Generate a random number between 0 and 100
      randomNumbers.push(randomNumber);
    }

    setNumbers(randomNumbers);
  };

  useEffect(() => {
    generateRandomNumbers()
  }, [focusSessionCompleted])

  useEffect(() => {
    try {
      if (user) {
        checkDocumentExists("users", user.uid)
      } else {
        console.log("Not a user")
      }
    } catch(error) {
      console.log(error)
    }
  }, [loading])

  useEffect(() => {
    if (user) {
      checkDocumentExists("users", user.uid)
    }
  }, [user])

  const checkDocumentExists = async (collection, documentId) => {
    try {
        const docRef = doc(db, collection, documentId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          setUserData(docSnap.data())
        } else {

          await setDoc(doc(db, collection, documentId), {
            breakTime: 10,
            focusTime: 60,
            completedSessions: 0,
          });
        }
    } catch (error) {
      console.error('Error checking document:', error);
      return false;
    }
  };


  const login = () => {
      const provider = new GoogleAuthProvider(); 

    signInWithRedirect(auth, provider);
  }

 
  return (
    <div className="App">
      <h1>Study Timer</h1>
      {user ? <img className='pfp-image' src={user.photoURL} alt={user.displayName} /> : ""}

      <h2>Completed Sessions: {focusSessionCompleted}</h2>
        
      {numbers.map((number, index) => {
        return <img alt='tomato' className='tomato' src={tomato} key={index} />
      })}

      
<br />
      <button className='start-button' onClick={() => setFocusTimerStart(true)}>START FOCUS TIMER</button>
      <button className='start-button' onClick={() => setBreakTimerStart(true)}>START BREAK TIMER</button>
      {focusTimerStart ? <FocusTimer setFocusTimerStart={setFocusTimerStart} checkDocumentExists={checkDocumentExists} userData={userData} setFocusSessionCompleted={setFocusSessionCompleted} focusSessionCompleted={focusSessionCompleted} /> : ""}
      {breakTimerStart ? <BreakTimer setBreakTimerStart={setBreakTimerStart} userData={userData} /> : ""}
      
      {!user && !loading ? 
        <div><h3>Login to customize study time, save sessions, and more!</h3>
      <button onClick={login}>Login with Google</button></div>
       : 
      <div>
      <br />
        {!toggleSettings ? <TbSettings onClick={() => setToggleSettings(!toggleSettings)} className='big-icon' /> : 
        <div>
          <TbSettingsFilled onClick={() => setToggleSettings(!toggleSettings)} className='big-icon'  />
          <Settings userData={userData} checkDocumentExists={checkDocumentExists} />
        </div>}
      </div>}

      
    </div>
  );
}

export default App;



