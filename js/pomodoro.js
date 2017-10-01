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

Created by Aos (@aosdabbagh)

License: MIT
*/

(function(root) {

  let timerID,
    duration,
    isPause,
    switchTimer = false;

  /* 
  Handlers 
  */
  // Main Timer
  const display = document.querySelector("#mainTimer");
  const startTimerBtn = document.querySelector("#startTimerBtn");
  const stopTimerBtn = document.querySelector("#stopTimerBtn");
  const resetBtn = document.querySelector("#reset");
  stopTimerBtn.hidden = true;

  const currentSesh = document.querySelector("#currentSesh");
  const currentBreak = document.querySelector("#currentBreak");
  const audio = document.querySelector("audio");

  // Session Timer
  const seshDisplay = document.querySelector("#seshTimer");
  const seshNegBtn = document.querySelector("#seshNeg");
  const seshPosBtn = document.querySelector("#seshPos");

  // Break Timer
  const breakDisplay = document.querySelector("#breakTimer");
  const breakNegBtn = document.querySelector("#breakNeg");
  const breakPosBtn = document.querySelector("#breakPos");

  /* 
  Event listeners
  */
  // Main timer
  startTimerBtn.addEventListener("click", eventsOnClickStart);
  stopTimerBtn.addEventListener("click", eventsOnClickStop);
  resetBtn.addEventListener("click", resetTimer);
  // Session timer
  seshNegBtn.addEventListener("click", seshTimerNeg);
  seshPosBtn.addEventListener("click", seshTimerPos);
  // Break timer
  breakPosBtn.addEventListener("click", breakTimerLong);
  breakNegBtn.addEventListener("click", breakTimerShort);

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
    const timer = Number(seshDisplay.textContent);
    display.textContent = (timer < 10 ? "0" + timer : timer) + ":00";
    duration = timer * 60;
    currentSesh.classList.remove("current");
    currentBreak.classList.remove("current");
    display.classList.remove("current");
    isPause = undefined;
    switchTimer = false;
  }

  // Session timer
  function seshTimerPos() {
    seshDisplay.textContent = Number(seshDisplay.textContent) + 1;
    if (isPause == undefined) {
      const timer = Number(seshDisplay.textContent);
      display.textContent = (timer < 10 ? "0" + timer : timer) + ":00";
    }
  };
  function seshTimerNeg() {
    seshDisplay.textContent = Number(seshDisplay.textContent) - 1;
    if (seshDisplay.textContent < 1) {
      seshDisplay.textContent = 1;
    }
    if (isPause == undefined) {
      const timer = Number(seshDisplay.textContent);
      display.textContent = (timer < 10 ? "0" + timer : timer) + ":00";
    }
  };

  // Break timer
  function breakTimerLong() {
    breakDisplay.textContent = 10;
    breakNegBtn.classList.remove("btn-options-selected");
    breakPosBtn.classList.remove("btn-options-selected");
    breakPosBtn.classList.add("btn-options-selected");
  };
  function breakTimerShort() {
    breakDisplay.textContent = 5;
    breakNegBtn.classList.remove("btn-options-selected");
    breakPosBtn.classList.remove("btn-options-selected");
    breakNegBtn.classList.add("btn-options-selected");
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
      currentSesh.classList.remove("current");
      currentBreak.classList.add("current");
      display.classList.add("current");
    } else {
      duration = Number(seshDisplay.textContent) * 60;
      currentSesh.classList.add("current");
      currentBreak.classList.remove("current");
      display.classList.remove("current");
    }

    timerID = setInterval(function () {
      let minutes, seconds;
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
        audio.play();
        startTimer();
      }
    }, 1000)
  }

  // Root will be `window` in browser or `global` in node
})(this);
