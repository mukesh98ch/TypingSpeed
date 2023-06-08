## About
I learn touch typing from monkeytype and ngram-type to improve my typing speed. Test project is a web application built with React, JavaScript, and CSS. It provides users with a platform to test and improve their typing speed and accuracy. The main goal of this project is to develop an interactive and fun typing test that measures user typing speed and provides real-time feedback.
Test Project can be expanded to include other features such as user accuracy in comparing typing skills with others, saving test results, leaderboard functionality, etc. It serves as a useful tool individuals who want to learn and grow their writing skills

## Explanation of Code:- 

1. This script imports the required dependencies: React, useState, useEffect, and useRef from the 'react' package. The './App.css' import is for CSS files with the specific styling of the App component.

```import React, { useState, useEffect, useRef } from 'react';```
```import './App.css';```

2. The beginning of the App activity phase. It uses the useState hook to trigger multiple state variables. These variables include text (user input), sampleText (randomly generated text), started (indicates whether recording was started), startTime (time stamp when recording was started), endTime (time stamp time completed writing), wpm (words per minute), accuracy (percentage of accuracy), timeLimit (selected time to write), and timerRunning (indicates whether the timer is running). textareaRef The textarea is a reference to the DOM element and is created using the useRef hook.

3. The generateSampleText function selects a random sentence or paragraph from a set of sample texts (loremIpsumText) and updates the sampleText condition. Use the useEffect hook to create an instance text when the object is loaded (empty dependency array[]).

4. useEffect hook is responsible for resetting the state variable whenever the sampleText changes. Used to override progress of the text when a new sample text is created.

5. The handleInputChange function is called whenever the value of the textarea is changed. It updates the text position with the input value. If the script has not yet started, it sets the started condition to true, writes startTime, and starts the timer. If the input matches sampleText, it writes endTime and stops the timer.

6. useEffect hook is responsible for updating the timer every second when the timerRunning condition is true. It calculates the elapsed time based on the startTime and checks if the timeLimit has been exceeded. When the timeout is reached, setting timerRunning to false stops the timer and clears the interval.

7. useEffect hook calculates typing accuracy and words per minute (WPM) after typing. This works when the endTime, startTime, sampleText.length, or text is changed. It calculates elapsed time in minutes, number of words in sampleText, number of lines typed, percent accuracy, and WPM. The calculated values ​​are then saved in accuracy and wpm mode.

8. Clicking the "Start" button calls the handleStart function. It creates a new sample script, sets up the conditions needed to initiate a new session registration, reschedules the time, clears the script progress, and highlights the available information for the user to enter

9. The JSX code that shows the UI for the typing speed check application. It displays sample text, text field for user input, typing precision and WPM After typing, dropdown to select time limit, start new typing session with "Start" button display value, onChange, disabled properties are set in textarea and select elements based on national variables.

10. Using all these steps i create a typing speed web appication.

