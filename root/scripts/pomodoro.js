"use strict";

import "./initTimeChoices.js";

// HTML template used (when choices are confirmed)
// Also transfers over the choice values to this script
// Also starts the timer
document.addEventListener("choicesConfirmed", (event) => {
    const pomodoroTimerHTML = document.getElementById("pomodoroTimer");
    
    const {workMin, pauseMin, iterations} = event.detail;

    let numPauses = iterations - 1;

    pomodoroTimerHTML.innerHTML = 
        `
        <br>
        <div id="textAndTimer">
            <p id="timerText">Timer:</p>
            <p id="timer">Loading timer...</p>
            <p id="currentSesh"></p>
        </div>
        <hr><br>
        <button id="pauseResumeBtn">Pause</button>
        `
    ;

    const timerText = document.getElementById("timerText");
    const timer = document.getElementById("timer");
    const currentSesh = document.getElementById("currentSesh");
    const pauseResumeBtn = document.getElementById("pauseResumeBtn");

    let isPaused = false;
        
    pauseResumeBtn.addEventListener("click", () => {
        isPaused = !isPaused;
        if (isPaused) {
            pauseResumeBtn.textContent = "Resume";
        }
        else {
            pauseResumeBtn.textContent = "Pause";
        }
    });

    startTimer()

    // Starting the timer:
    function startTimer() {
        let currentIteration = 1;
        let working = true;
        let timeLeft = workMin * 60;

        timerText.textContent = "Work left:";
        currentSesh.textContent = "Session: " + currentIteration + "/" + iterations;

        // Updating the timer:
        function updateTimer() {
            if (isPaused) return;

            let minutes = Math.floor(timeLeft / 60);
            let seconds = timeLeft % 60;

            timer.textContent = String(minutes).padStart(2, '0') + ":" + String(seconds).padStart(2, '0');
            
            if (timeLeft > 0) {
                timeLeft--;
            }
            else {
                if (working && numPauses === 0) {
                    clearInterval(timeInterval);
                    timerText.textContent = "Congrats! You are done! ⎚⩊⎚✧";
                    timer.textContent = "You worked for: " + workMin * iterations + "min";
                    pauseResumeBtn.remove();
                    new Audio("sound/finishLine.wav").play();
                }
                else if (working && numPauses !== 0) {
                    numPauses--;
                    working = false;
                    timeLeft = pauseMin * 60;
                    timerText.textContent = "Pause left:";
                    new Audio("sound/pause.wav").play();
                }
                else if (!working) {
                    currentIteration++;
                    currentSesh.textContent = "Session: " + currentIteration + "/" + iterations;
                    working = true;
                    timeLeft = workMin * 60;
                    timerText.textContent = "Work left:";
                    new Audio("sound/work.wav").play();
                }
            }
        };

    const timeInterval = setInterval(updateTimer, 1000);
    updateTimer();
};
});




