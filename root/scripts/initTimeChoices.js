"use strict";

// Chosen time:
let workMin = 0;
let pauseMin = 0;
let repeats = 0;

// Work range logic:
let workText = document.getElementById("workText")
let workRange = document.getElementById("workRange");
workText.innerText = ("Work: " + workRange.value + " min");

workRange.addEventListener("input", () => {
    workText.textContent = "Work: " + workRange.value + " min";
});

// Pause range logic:
let pauseText = document.getElementById("pauseText")
let pauseRange = document.getElementById("pauseRange");
pauseText.innerText = ("Pause: " + pauseRange.value + " min");

pauseRange.addEventListener("input", () => {
    pauseText.textContent = "Pause: " + pauseRange.value + " min";
});

// Iteration range logic:
let iterationText = document.getElementById("iterationText")
let iterationRange = document.getElementById("iterationRange");
iterationText.innerText = ("Repeat: " + iterationRange.value + " times");

iterationRange.addEventListener("input", () => {
    iterationText.textContent = "Repeat: " + iterationRange.value + " times";
});

// Confirm choices logic:
let confirmButton = document.getElementById("confirmBtn");
let choices = document.getElementById("initialChoices");

confirmButton.addEventListener("click", () => {
    workMin = workRange.value;
    pauseMin = pauseRange.value;
    repeats = iterationRange.value;

    choices.style.display = "none";
});