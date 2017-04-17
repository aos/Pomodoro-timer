/*
========= Pomodoro Timer

Features:
-- A countdown timer with user-specified duration
-- A break timer with either short (5 min) or long (10 min) duration

-- When session timer reaches 0, break timer starts
-- When break timer reaches 0, session timer restarts

-- Must be able to start timer
-- Must be able to pause timer
-- Must be able to reset timer 
*/

var timerID,
    duration,
    isPause,
    switchTimer = false;

/* 
  Handlers 
*/
// Main Timer
var display = document.querySelector("#mainTimer");
var startTimerBtn = document.querySelector("#startTimerBtn");
var stopTimerBtn = document.querySelector("#stopTimerBtn");
var resetBtn = document.querySelector("#reset");
stopTimerBtn.hidden = true;

// Session Timer
var seshDisplay = document.querySelector("#seshTimer");
var seshNegBtn = document.querySelector("#seshNeg");
var seshPosBtn = document.querySelector("#seshPos");

// Break Timer
var breakDisplay = document.querySelector("#breakTimer");
var breakNegBtn = document.querySelector("#breakNeg");
var breakPosBtn = document.querySelector("#breakPos");

/* 
  Event listeners
*/
// Main timer buttons
var clickStartTimer = startTimerBtn.addEventListener("click", eventsOnClickStart);
var clickStopTimer = stopTimerBtn.addEventListener("click", eventsOnClickStop);
var resetTimer = resetBtn.addEventListener("click", resetTimer);

// Session timer buttons
var seshNeg = seshNegBtn.addEventListener("click", seshTimerNeg);
var seshPos = seshPosBtn.addEventListener("click", seshTimerPos);

// Break timer buttons
var breakPos = breakPosBtn.addEventListener("click", breakTimerLong);
var breakNeg = breakNegBtn.addEventListener("click", breakTimerShort);

/*
  Controllers
*/
// Main timer
function eventsOnClickStart(e) {
  startTimer();
  // Hides start button and shows pause button on click
  e.currentTarget.hidden = true;
  stopTimerBtn.hidden = false;
  // Disables timer control buttons when timer is running
  resetBtn.disabled = true;
  // Handles pause functionality
  isPause = false;
};
function eventsOnClickStop(e) {
  clearInterval(timerID);
  // Hides pause button and shows start button on click
  e.currentTarget.hidden = true;
  startTimerBtn.hidden = false;
  // Enables timer control buttons when timer is paused
  resetBtn.disabled = false;
  // Handles pause functionality
  isPause = true;
};
function resetTimer() {
  var timer = Number(seshDisplay.textContent);
  display.textContent = (timer < 10 ? "0" + timer : timer) + ":00";
  duration = timer * 60;
}

// Session timer
function seshTimerPos() {
  seshDisplay.textContent = Number(seshDisplay.textContent) + 1;
};
function seshTimerNeg() {
  seshDisplay.textContent = Number(seshDisplay.textContent) - 1;
  if (seshDisplay.textContent < 1) {
    seshDisplay.textContent = 1;
  }
};

// Break timer
function breakTimerLong() {
  breakDisplay.textContent = 10;
};
function breakTimerShort() {
  breakDisplay.textContent = 5;
};

/* 
  Timer functionality 
*/
function startTimer() {

  // Handles pause timer, and duration of session and break timer
  if (isPause) {
    // Do nothing (aka don't reset duration)
  } else if (switchTimer) {
    duration = Number(breakDisplay.textContent) * 60;
  } else {
    duration = Number(seshDisplay.textContent) * 60;
  }

  timerID = setInterval(function () {
    var minutes, seconds;
    // Get integer value
    minutes = parseInt(duration / 60, 10);
    seconds = parseInt(duration % 60, 10);

    // Pad with leading "0" if less than 10
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    // Display timer
    display.textContent = minutes + ":" + seconds;

    // Decrement by 1 second
    duration--;

    if (duration < 0) {
      // Stop timer first
      clearInterval(timerID);
      // Change logic to switch to break timer
      switchTimer = !switchTimer;
      // Restart timer
      startTimer();
    }
  }, 1000)
}