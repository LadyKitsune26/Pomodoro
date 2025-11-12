
// // Chat GPT Pomodoro Timer Starter Code to the 1000th millisecond
// // Select elements
// const minutesEl = document.querySelector(".timer__minutes");
// const secondsEl = document.querySelector(".timer__seconds");
// const millisecondsEl = document.querySelector(".timer__milliseconds");

// const startBtn = document.querySelector(".stopwatch__start");
// const stopBtn = document.querySelector(".stopwatch__stop");
// const resetBtn = document.querySelector(".stopwatch__reset");

// // Default Pomodoro time in milliseconds (25 minutes)
// let defaultTime = 25 * 60 * 1000;
// let timeLeft = defaultTime;
// let timerInterval = null;
// let previousTimestamp = null;
// let running = false;

// // Format helper (pad with zeros)
// function formatTime(ms) {
//   const totalSeconds = Math.floor(ms / 1000);
//   const minutes = Math.floor(totalSeconds / 60);
//   const seconds = totalSeconds % 60;

//   // Milliseconds to the 1000th (0–999 range)
//   const milliseconds = Math.floor(ms % 1000);

//   minutesEl.textContent = String(minutes).padStart(2, "0");
//   secondsEl.textContent = String(seconds).padStart(2, "0");
//   millisecondsEl.textContent = String(milliseconds).padStart(3, "0");
// }

// // Countdown loop
// function updateTimer(timestamp) {
//   if (!previousTimestamp) previousTimestamp = timestamp;

//   const elapsed = timestamp - previousTimestamp;
//   previousTimestamp = timestamp;
//   timeLeft -= elapsed;

//   if (timeLeft <= 0) {
//     timeLeft = 0;
//     formatTime(timeLeft);
//     cancelAnimationFrame(timerInterval);
//     running = false;
//     alert("Pomodoro complete! Take a break.");
//     return;
//   }

//   formatTime(timeLeft);
//   timerInterval = requestAnimationFrame(updateTimer);
// }

// // Start, stop, reset logic
// startBtn.addEventListener("click", () => {
//   if (!running) {
//     running = true;
//     previousTimestamp = null;
//     timerInterval = requestAnimationFrame(updateTimer);
//   }
// });

// stopBtn.addEventListener("click", () => {
//   if (running) {
//     running = false;
//     cancelAnimationFrame(timerInterval);
//     previousTimestamp = null;
//   }
// });

// resetBtn.addEventListener("click", () => {
//   running = false;
//   cancelAnimationFrame(timerInterval);
//   timeLeft = defaultTime;
//   previousTimestamp = null;
//   formatTime(timeLeft);
// });

// // Initialize display
// formatTime(defaultTime);



// David's Version of Pomodoro Timer

let cancelId;
let startTime;
let savedTime = 0;
const countdown = 5 * 1000
const timerMilliSeconds = document.querySelector('.timer__milliseconds')
const timerSeconds = document.querySelector('.timer__seconds')
const timerMinutes = document.querySelector('.timer__minutes')
const startButton = document.querySelector('stopwatch__start')
const stopButton = document.querySelector('stopwatch__stop')
const resetButton = document.querySelector('stopwatch__reset')

function startTimer(){
    startButton.disabled = true;
    stopButton.disabled = false;
    resetButton.disabled = false;

    startTime = Date.now();
    cancelId = requestAnimationFrame(updateTimer)
}

function stopTimer(){
    savedTime += Date.now() - startTime + savedTime;
    cancelAnimationFrame(cancelId)
    console.log(savedTime)
}

function resetTimer(){
    startTime = Date.now();
    savedTime = 0;
    
    timerMilliSeconds.innerHTML = "000"
    timerSeconds.innerHTML = "05";
    timerMinutes.innerHTML = "01";
}

function updateTimer(){
    console.log('this ran')
    let millisElapsed = Date.now() - startTime + savedTime

    let millisLeft = countdown - millisElapsed;

    if (millisLeft < 0) {
        millisLeft = 0
        cancelAnimationFrame(cancelId)
        cancelId = null
    }
    let secondsLeft = millisLeft / 1000
    let minutesLeft = secondsLeft / 60

    let millisText = millisLeft % 1000
    let secondsText = Math.floor(secondsLeft % 60);
    let minutesText = Math.floor(minutesLeft);

    if(minutesText.toString().length < 2) {
        minutesText = minutesText.toString().padStart(2, '0')
    }
    if(secondsText.toString().length < 2) {
        secondsText = secondsText.toString().padStart(2, '0')
    }
    if(millisText.toString().length < 3) {
        millisText = millisText.toString().padStart(3, '0')
    }

    timerMilliSeconds.innerHTML = millisText
    timerSeconds.innerHTML = secondsText;
    timerMinutes.innerHTML = minutesText;

    if (cancelId){
    cancelId = requestAnimationFrame(updateTimer)
    }
}