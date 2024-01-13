const playBtn = document.querySelector("#play");
const pauseBtn = document.querySelector("#pause");
const resetBtn = document.querySelector("#reset");
const lapBtn = document.querySelector("#lap");

const showLap = document.querySelector("#lap-container");
const result = document.querySelector("#result");

let msInterval = 1;
let secondInterval = 100;
let minuteInterval = 60 * secondInterval;
let hourInterval = 60 * minuteInterval;

let milliSecond = 0;
let second = 0;
let minute = 0;
let hour = 0;

let intervalIndex; // Timer interval ID
let lapEnabled; // to control lap button visibility

// Event listeners for buttons
playBtn.addEventListener("click", startTime);
pauseBtn.addEventListener("click", pauseTime);
resetBtn.addEventListener("click", resetTime);

lapBtn.addEventListener("click", lapTime);

// Function to start the timer
function startTime() {
  clearInterval(intervalIndex);

  

  // Enable lap button
  lapEnabled = true;

  // Set the interval to update the timer display
  intervalIndex = setInterval(function () {
    milliSecond += msInterval;

    if (milliSecond >= secondInterval) {
      milliSecond = 0;
      second++;

      if (second >= 60) {
        second = 0;
        minute++;

        if (minute >= 60) {
          minute = 0;
          hour++;
        }
      }
    }

    if (hour >= 60) {
      hour = 0;
    }

    // Update the timer display
    updateDisplay();
  }, 10);
}

// Function to pause the timer
function pauseTime() {
  clearInterval(intervalIndex);
  lapEnabled = false;
}

// Function to reset the timer
function resetTime() {
  clearInterval(intervalIndex);
  // Reset timer values
  milliSecond = 0;
  second = 0;
  minute = 0;
  hour = 0;

  // Clear lap container
  showLap.innerHTML = "";

  // Update the timer display
  updateDisplay();

  // Disable lap button
  lapEnabled = false;
}

// Function to update the timer display
function updateDisplay() {
  result.textContent = `${hour < 10 ? "0" + hour : hour}:${
    minute < 10 ? "0" + minute : minute
  }:${second < 10 ? "0" + second : second}:${
    milliSecond < 10 ? "0" + milliSecond : milliSecond
  }`;
}

// Function to handle lap button clicks
function lapTime() {
  // Check if lap button is enabled
  if (lapEnabled) {
    // Create a new div to display lap time
    const lapTimeDisplay = document.createElement("div");
    // Format the time values
    lapTimeDisplay.textContent = `${hour < 10 ? "0" + hour : hour}:${
      minute < 10 ? "0" + minute : minute
    }:${second < 10 ? "0" + second : second}:${
      milliSecond < 10 ? "0" + milliSecond : milliSecond
    }`;
    // Append the lap time display to the lap container
    showLap.appendChild(lapTimeDisplay);
  }
}
