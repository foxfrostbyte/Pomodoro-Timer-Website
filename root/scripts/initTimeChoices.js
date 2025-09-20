"use strict";

// Chosen time:
let workMin = 0;
let pauseMin = 0;
let repeats = 0;

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
});

// Iteration range logic:
const iterationText = document.getElementById("iterationText")
const iterationRange = document.getElementById("iterationRange");
iterationText.innerText = ("Repeat: " + iterationRange.value + " times");

iterationRange.addEventListener("input", () => {
    iterationText.textContent = "Repeat: " + iterationRange.value + " times";
});

// Confirm choices logic:
const confirmButton = document.getElementById("confirmBtn");
const choices = document.getElementById("initialChoices");

confirmButton.addEventListener("click", () => {
    workMin = workRange.value;
    pauseMin = pauseRange.value;
    repeats = iterationRange.value;

    choices.style.display = "none";
});