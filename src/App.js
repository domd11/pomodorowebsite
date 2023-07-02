import { useEffect, useState } from 'react';
import './App.css';
import FocusTimer from './components/FocusTimer';
import {GiTomato} from 'react-icons/gi'

import tomato from "./tomato.png"
function App() {
  const [numbers, setNumbers] = useState([]);
  const [focusTimerStart, setFocusTimerStart] = useState(false);
  const [focusSessionCompleted, setFocusSessionCompleted] = useState(0)
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


 
  return (
    <div className="App">
      <h1>Study Timer</h1>

      <h2>Completed Sessions: {focusSessionCompleted}</h2>
        
      {numbers.map((number, index) => {
        return <img alt='tomato' className='tomato' src={tomato} key={index} />
      })}

      
<br />
      <button onClick={() => setFocusTimerStart(true)}>START FOCUS TIMER</button>

      {focusTimerStart ? <FocusTimer setFocusTimerStart={setFocusTimerStart} setFocusSessionCompleted={setFocusSessionCompleted} focusSessionCompleted={focusSessionCompleted} /> : ""}
    </div>
  );
}

export default App;
