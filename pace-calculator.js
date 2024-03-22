// Get the form element and add a submit event listener
const form = document.querySelector('form');
form.addEventListener('submit', calculatePace);

/**
 * Calculates the time input by the user.
 *
 * @return Time in seconds.
 */
function getTime() {
  const hours = Number(document.querySelector('#hours').value);
  const minutes = Number(document.querySelector('#minutes').value);
  const seconds = Number(document.querySelector('#seconds').value);
  if (hours == null && minutes == null && seconds == null) {
    return null;
  } else {
    return (hours * 3600) + (minutes * 60) + seconds;
  }
}

function splitTime(timeInSeconds) {
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = Math.round(timeInSeconds % 60);

  return [hours, minutes, seconds];
}

function updateTime(timeInSeconds) {
  split = splitTime(timeInSeconds);
  document.querySelector('#hours').value = split[0];
  document.querySelector('#minutes').value = split[1];
  document.querySelector('#seconds').value = split[2];
}

/**
 * Converts time in seconds to a formatted time string (hh:mm:ss).
 * Optionally includes hours only if hours is greater than zero.
 * 
 * @param {number} timeInSeconds The time in seconds.
 * @returns {string} The formatted time string.
 */
function formatTime(timeInSeconds) {
  split = splitTime(timeInSeconds);
  const hours = split[0];
  const minutes = split[1];
  const seconds = split[2];

  const formattedHours = hours > 0 ? String(hours).padStart(2, '0') + ':' : '';
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');

  return `${formattedHours}${formattedMinutes}:${formattedSeconds}`;
}

function formattedPaceToSeconds(timeString) {
  const timeComponents = timeString.split(':').map(Number);

  if (timeComponents.length === 3) {
      // Format: hh:mm:ss
      const [hours, minutes, seconds] = timeComponents;
      return hours * 3600 + minutes * 60 + seconds;
  } else if (timeComponents.length === 2) {
    // Format: mm:ss
    const [minutes, seconds] = timeComponents;
    return minutes * 60 + seconds;
  } else if (timeComponents.length === 1) {
    const [seconds] = timeComponents;
    return seconds;
  } else {
      throw new Error('Invalid time format');
  }
}

function calculatePace(event) {
  console.log("calculatePace")
  event.preventDefault(); // prevent the form from submitting

  // Get the input values
  time = getTime();
  const distance = Number(document.querySelector('#distance').value);
  const pace = Number(document.querySelector('#pace').value);

  // Calculate the pace if time and distance are provided
  if (time && distance) {
    const pace = time / distance;
    document.querySelector('#pace').value = pace.toFixed(2);
  }

  // Calculate the time if distance and pace are provided
  if (distance && pace && !time) {
    console.log("fuck");
    const time = (distance * pace) / 60;
    document.querySelector('#pace').value = time.toFixed(2);
  }
}

function calculatePaceOnTimeChange(event) {
  console.log("calculatePace")
  event.preventDefault(); // prevent the form from submitting

  // Get the input values
  time = getTime();
  const distance = Number(document.querySelector('#distance').value);

  // Calculate the pace if time and distance are provided
  if (time && distance) {
    const pace = time / distance;
    document.querySelector('#pace').value = formatTime(pace);
  }
}

const hoursInput = document.querySelector("#hours")
hoursInput.addEventListener("input", calculatePaceOnTimeChange)
const minutesInput = document.querySelector("#minutes")
minutesInput.addEventListener("input", calculatePaceOnTimeChange)
const secondsInput = document.querySelector("#seconds")
secondsInput.addEventListener("input", calculatePaceOnTimeChange)

function calculatePaceOnDistanceChange(event) {
  console.log("calculatePaceOnDistanceChange")
  event.preventDefault(); // prevent the form from submitting

  // Get the input values
  time = getTime();
  const distance = Number(document.querySelector('#distance').value);
  const pace = Number(document.querySelector('#pace').value);

  if (!distance) {
    document.querySelector('#pace').value = null;
  }

  // Calculate the pace if time and distance are provided
  else if (time) {
    console.log("time = " + time);
    const pace = time / distance;
    console.log("pace = " + pace);
    document.querySelector('#pace').value = formatTime(pace);
  }

  // Calculate the time if distance and pace are provided
  else if (pace) {
    console.log("time = " + time);
    const time = distance * pace
    // document.querySelector('#time').value = time.toFixed(2);
  }
}

const distanceInput = document.querySelector("#distance")
distanceInput.addEventListener("input", calculatePaceOnDistanceChange)

/**
 *
 *
 * @param {*} event
 */
function calculateTimeOnPaceChange(event) {
  console.log("calculateTimeOnPaceChange")
  event.preventDefault(); // prevent the form from submitting

  // Get the input values
  time = getTime();
  const distance = Number(document.querySelector('#distance').value);
  const pace = document.querySelector('#pace').value;

  console.log("pace = " + pace);
  if (!pace) {
    console.log("wtf");
    return
  }

  // Calculate the time is the distance is provide.
  else if (distance) {
    console.log("pace = " + pace);
    const time = distance * formattedPaceToSeconds(pace);
    console.log("time = " + time);
    updateTime(time);
  }
}

const paceInput = document.querySelector("#pace")
paceInput.addEventListener("input", calculateTimeOnPaceChange)
