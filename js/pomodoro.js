/*
This is a Pomodoro clock, pomodoro means tomato in Italian

Features:
-- A countdown timer with user-specified duration
-- A break timer with user-specified duration

-- When session timer reaches 0, break timer starts
-- When break timer reaches 0, session timer restarts

-- Must be able to start timer on click
-- Must be able to pause timer on click
*/

var timerID;
var timer;
var duration;
var minutes, seconds;
var isPause = false;

/* 
  Handlers 
*/
var display = document.querySelector("#mainTimer");
var startTimerBtn = document.querySelector("#startTimerBtn");
var stopTimerBtn = document.querySelector("#stopTimerBtn");
stopTimerBtn.hidden = true;

// Session
var seshDisplay = document.querySelector("#seshTimer");
var seshNegBtn = document.querySelector("#seshNeg");
var seshPosBtn = document.querySelector("#seshPos");

/*
  View
*/
timer = Number(seshDisplay.textContent);
duration = timer * 60;

/* 
  Event listeners
*/
var clickStartTimer = startTimerBtn.addEventListener("click", eventsOnClickStart)
var clickStopTimer = stopTimerBtn.addEventListener("click", eventsOnClickStop)

/*
  Controllers
*/
function eventsOnClickStart(e) {
  // Hides start button and shows pause button on click
  e.currentTarget.hidden = true;
  stopTimerBtn.hidden = false;

  // If timer was started, this will be true. If timer paused, timer duration will be equal to duration when paused
  if (isPause === true) {
    timer = duration;
  }
  startTimer();
}

function eventsOnClickStop(e) {
  clearInterval(timerID);
  e.currentTarget.hidden = true;
  startTimerBtn.hidden = false;
}

/* 
  Timer functionality 
*/
function startTimer() {
  timerID = setInterval(function () {

    // Get integer value
    minutes = parseInt(duration / 60, 10);
    // Use mod to countdown in seconds
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
      // Set duration 
      duration = timer * 60;
      // Restart timer
      startTimer();
    }
    // Sets whether the timer has been paused or not
    // Starts false, when timer activated, it is flipped to true
    isPause = !isPause;
  }, 1000)
}