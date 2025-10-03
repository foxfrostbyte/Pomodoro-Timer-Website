"use strict";

import "./initTimeChoices.js";

// Main logic: on event (confirmed choices) get the values, start timer and update it.
document.addEventListener("choicesConfirmed", (event) => {
    
    // Grabbing init values and configuring number of pauses:
    const {workMin, pauseMin, iterations} = event.detail;
    let numPauses = iterations - 1;

    // Inserting HTML template:
    const pomodoroTimerHTML = document.getElementById("pomodoroTimer");
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

    // Various constants that isn't initialized in timer loop:
    const timerText = document.getElementById("timerText");
    const timer = document.getElementById("timer");
    const currentSesh = document.getElementById("currentSesh");

    // Pause/resume button logic:
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

    // Starting the timer:
    startTimer()
    function startTimer() {
        let currentIteration = 1;
        let working = true;
        let timeLeft = workMin * 60;

        timerText.textContent = "Work left:";
        currentSesh.textContent = "Session: " + currentIteration + "/" + iterations;

        // Updating the timer:
        function updateTimer() {
            if (isPaused) return; // Stops updating if pause button is active

            // Configuring timer text:
            let minutes = Math.floor(timeLeft / 60);
            let seconds = timeLeft % 60;
            timer.textContent = String(minutes).padStart(2, '0') + ":" + String(seconds).padStart(2, '0');
            
            // Updates tab to display timer:
            if (working) {
                document.title = "Work: " + timer.textContent + " | Pomodoro";
            }
            if (!working) {
                document.title = "Pause: " + timer.textContent + " | Pomodoro";
            }

            // If more time left, increment it:
            if (timeLeft > 0) {
                timeLeft--;
            }

            else {
                // If done working:
                if (working && numPauses === 0) {
                    clearInterval(timeInterval);
                    timerText.textContent = "Congrats! You are done! ⎚⩊⎚✧";
                    timer.textContent = "You worked for: " + workMin * iterations + "min";
                    pauseResumeBtn.remove();
                    new Audio("sound/finishLine.wav").play();
                    document.title = "Finished! | Pomodoro";
                }
                // Transitioning form work to pause:
                else if (working && numPauses !== 0) {
                    numPauses--;
                    working = false;
                    timeLeft = pauseMin * 60;
                    timerText.textContent = "Pause left:";
                    new Audio("sound/pause.wav").play();
                }
                // Transitioning from pause to work:
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

    const timeInterval = setInterval(updateTimer, 1000); // Runs updateTimer every second (1000ms)
    updateTimer(); // Avoids first run of updateTimer to take 1 sec
};
});




