"use strict";

// HTML template used:
const choices = document.getElementById("initialChoices");

choices.innerHTML =
    `
    <br><br>
    <div class="textAndRange">
        <label id="workText" for="workRange"></label>
        <input id="workRange" type="range" min="5" max="60" value="45" step="5">
    </div>
    <br><br>
    <div class="textAndRange">
        <label id="pauseText" for="pauseRange"></label>
        <input id="pauseRange" type="range" min="0" max="30" value="15" step="5">
    </div>
    <br><br>
    <div class="textAndRange">
        <label id="iterationText" for="iterationRange"></label>
        <input id="iterationRange" type="range" min="1" max="8" value="3" step="1">
    </div>
    <br>
    <p>Note: If pause is 0 min, iterations is fixed to 1, and vice versa.</p>
    <p>Example: 45min work, 15min pause, and 3 iterations will yield 3x45min work and 2x15min pause in between those 3 sessions.</p>
    <hr><br>
    <button id="confirmBtn">Confirm</button>
    `
;

// Chosen time:
let workMin = 0;
let pauseMin = 0;
let iterations = 0;

// Work range logic:
const workText = document.getElementById("workText")
const workRange = document.getElementById("workRange");
workText.innerText = ("Work: " + workRange.value + " min");

workRange.addEventListener("input", () => {
    workText.textContent = "Work: " + workRange.value + " min";
});

// Pause range logic:
const pauseText = document.getElementById("pauseText")
const pauseRange = document.getElementById("pauseRange");
pauseText.innerText = ("Pause: " + pauseRange.value + " min");

pauseRange.addEventListener("input", () => {
    pauseText.textContent = "Pause: " + pauseRange.value + " min";

    if (pauseRange.value === "0") {
        iterationRange.value = 1;
        iterationRange.disabled = true;
        iterationText.textContent = "Iterations: " + iterationRange.value;
    }
    else {
        if(iterationRange.value === "1") {
            iterationRange.value = 2;
            iterationText.textContent = "Iterations: " + iterationRange.value;
        }
        iterationRange.disabled = false;
        pauseText.textContent = "Pause: " + pauseRange.value + " min";
    }
});

// Iteration range logic:
const iterationText = document.getElementById("iterationText")
const iterationRange = document.getElementById("iterationRange");
iterationText.innerText = ("Iterations: " + iterationRange.value);

iterationRange.addEventListener("input", () => {
    iterationText.textContent = "Iterations: " + iterationRange.value;

    if (iterationRange.value === "1") {
        pauseRange.value = 0;
        pauseRange.disabled = true;
        pauseText.textContent = "Pause: " + pauseRange.value + " min";
    }
    else {
        if (pauseRange.value === "0") {
            pauseRange.value = 5;
            pauseText.textContent = "Pause: " + pauseRange.value + " min";
        }
        pauseRange.disabled = false;
        iterationText.textContent = "Iterations: " + iterationRange.value;
    }
});

// Confirm choices logic:
const confirmButton = document.getElementById("confirmBtn");
confirmButton.addEventListener("click", () => {
    workMin = workRange.value;
    pauseMin = pauseRange.value;
    iterations = iterationRange.value;

    const event = new CustomEvent("choicesConfirmed", {
        detail: {workMin, pauseMin, iterations}
    });

    document.dispatchEvent(event);

    choices.style.display = "none";
});