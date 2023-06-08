import React, { useState, useEffect, useRef } from 'react';
import './App.css';
const App = () => {
  const [text, setText] = useState('');
  const [sampleText, setSampleText] = useState('');
  const [started, setStarted] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [timeLimit, setTimeLimit] = useState(60);
  const [timerRunning, setTimerRunning] = useState(false);
  const textareaRef = useRef(null);

  const generateSampleText = () => {
    const loremIpsumText = [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Pellentesque aliquet tristique ipsum, in sollicitudin dolor.",
      "Maecenas vel aliquet quam, eu tincidunt sem.",
      "Quisque sed nibh ac nisi egestas semper.",
      "Vivamus nec scelerisque erat, ut varius ligula.",
      "Nulla facilisi. Curabitur aliquam sem id est luctus posuere.",
      "Sed nec lectus ut elit dignissim rutrum.",
      "Cras auctor urna risus, non malesuada tortor venenatis non.",
      "Donec suscipit, libero non lobortis fringilla, turpis lorem congue nunc, in cursus dolor magna a nunc.",
      "Fusce condimentum ultricies tristique. Suspendisse sit amet tellus vitae nunc laoreet congue."
    ];

    const randomIndex = Math.floor(Math.random() * loremIpsumText.length);
    const randomText = loremIpsumText[randomIndex];
    setSampleText(randomText);
  };

  useEffect(() => {
    generateSampleText();
  }, []);

  useEffect(() => {
    if (sampleText) {
      setText('');
      setStarted(false);
      setStartTime(0);
      setEndTime(0);
      setWpm(0);
      setAccuracy(0);
      setTimerRunning(false);
    }
  }, [sampleText]);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setText(inputValue);

    if (!started) {
      setStarted(true);
      setStartTime(new Date().getTime());
      setTimerRunning(true);
    }

    if (inputValue === sampleText) {
      setEndTime(new Date().getTime());
      setTimerRunning(false);
    }
  };

  useEffect(() => {
    if (timerRunning) {
      const interval = setInterval(() => {
        const elapsedTime = Math.floor((new Date().getTime() - startTime) / 1000);
        if (elapsedTime >= timeLimit) {
          setTimerRunning(false);
          clearInterval(interval);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [startTime, timeLimit, timerRunning]);

  useEffect(() => {
    if (endTime > startTime) {
      const timeInMinutes = (endTime - startTime) / 60000;
      const numWords = sampleText.trim().split(' ').length;
      const typedChars = text.trim().length;
      const accuracyPercentage = Math.floor((typedChars / sampleText.length) * 100);
      const wpmValue = Math.floor(numWords / timeInMinutes);
      setWpm(wpmValue);
      setAccuracy(accuracyPercentage);
    }
  }, [endTime, startTime, sampleText.length, text]);

  const handleStart = () => {
    generateSampleText();
    setStarted(true);
    setStartTime(new Date().getTime());
    setEndTime(0);
    setWpm(0);
    setAccuracy(0);
    setTimerRunning(true);
    setText('');
    textareaRef.current.focus();
  };

  return (
    <div className="App">
      <h1>Typing Speed Test</h1>
      <div className="sample-text">
        <p>Type the following text:</p>
        <p>{sampleText}</p>
      </div>
      <textarea
        ref={textareaRef}
        value={text}
        onChange={handleInputChange}
        placeholder="Start typing..."
        enable={!started || !timerRunning}
      ></textarea>
      {started && text.trim() === sampleText.trim() && (
  <p className="result">
    Accuracy: {accuracy}% | WPM: {wpm}
  </p>
      )}
      <div className="time-limit">
        <label>Time Limit:</label>
        <select
          value={timeLimit}
          onChange={(e) => setTimeLimit(Number(e.target.value))}
          disabled={started}
        >
          <option value={60}>1 minute</option>
          <option value={30}>30 seconds</option>
          <option value={15}>15 seconds</option>
        </select>
      </div>
      {!started && (
        <button className="start-button" onClick={handleStart}>
          Start
        </button>
      )}
    </div>
  );
};

export default App;
