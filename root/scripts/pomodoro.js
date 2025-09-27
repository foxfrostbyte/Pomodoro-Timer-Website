"use strict";

import "./initTimeChoices.js";

// HTML template used (when choices are confirmed)
// Also transfers over the choice values to this script
// Also starts the timer
document.addEventListener("choicesConfirmed", (event) => {
    const pomodoroTimerHTML = document.getElementById("pomodoroTimer");
    
    const {workMin, pauseMin, iterations} = event.detail;

    let currentIteration = iterations;
    let numPauses = iterations - 1;

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

    // Starting the timer:
    function startTimer() {

        let isWork = true;
        let isPause = false;

        let timeLeft = workMin * 60;
        timerText.textContent = "Work left:";

        // Updating the timer:
        function updateTimer() {

            let minutes = Math.floor(timeLeft / 60);
            let seconds = timeLeft % 60;

            timer.textContent = String(minutes).padStart(2, '0') + ":" + String(seconds).padStart(2, '0');
            
            if (timeLeft > 0) {
                timeLeft--;
            }

            else {
                currentIteration--;
                clearInterval(timerInterval);

                if (isWork && currentIteration != null) {
                    isWork = false;
                    isPause = true;
                    timeLeft = pauseMin * 60;
                    startTimer();
                }
                else if (isPause) {
                    isWork = true;
                    timeLeft = workSec;
                    startTimer();
                }
            }
        };

    const timeInterval = setInterval(updateTimer, 1000);
};
});




