"use strict";

import "./initTimeChoices.js";

// HTML template used (when choices are confirmed)
// Also transfers over the choice values to this script
// Also starts the timer
document.addEventListener("choicesConfirmed", (event) => {
    const pomodoroTimerHTML = document.getElementById("pomodoroTimer");
    
    const {workMin, pauseMin, repeats} = event.detail;

    let currentRepeat = repeats;

    pomodoroTimerHTML.innerHTML = 
        `
        <br>
        <div id="textAndTimer">
            <p id="timerText">Timer:</p>
            <p id="timer">Loading timer...</p>
        </div>
        <hr><br>
        <button id="pauseResumeBtn">Pause</button>
        `
    ;

    const timerText = document.getElementById("timerText");
    const timer = document.getElementById("timer");
    const pauseResumeBtn = document.getElementById("pauseResumeBtn");

    startTimer()

    function startTimer() {

    // Setting initial timer mode:
    let isWork = true;
    let isPause = false;

    let timeLeft = workMin * 60;
    timerText.textContent = "Work left:";

    function updateTimer() {
        
        if (isPause) {
            return;
        }

        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;

        timer.textContent = String(minutes).padStart(2, '0') + ":" + String(seconds).padStart(2, '0');
        
        if (timeLeft > 0) {
            timeLeft--;
        }
        else {
            clearInterval(timerInterval);

            if (isWork) {
                isWork = false;
                isPause = true;
                timeLeft = pauseMin * 60;
                startTimer();
            }
            else {
                isWork = true;
                timeLeft = workSec;
                startTimer();
            }
        }
    };

    const timeInterval = setInterval(updateTimer, 1000);
};
});




