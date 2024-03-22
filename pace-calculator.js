// Get the form element and add a submit event listener
const form = document.querySelector('form');
form.addEventListener('submit', calculatePace);

function calculatePace(event) {
  event.preventDefault(); // prevent the form from submitting

  // Get the input values
  const time = Number(document.querySelector('#time').value);
  const distance = Number(document.querySelector('#distance').value);
  const pace = Number(document.querySelector('#pace').value);

  // Calculate the pace if time and distance are provided
  if (time && distance) {
    const pace = time / distance;
    document.querySelector('#pace').value = pace.toFixed(2);
  }

  // Calculate the time if distance and pace are provided
  if (distance && pace && !time) {
    const time = distance * pace
    document.querySelector('#pace').value = time.toFixed(2);
  }
}

function calculatePaceOnDistanceChange(event) {
  console.log("calculatePaceOnDistanceChange")
  event.preventDefault(); // prevent the form from submitting

  // Get the input values
  const time = Number(document.querySelector('#time').value);
  const distance = Number(document.querySelector('#distance').value);
  const pace = Number(document.querySelector('#pace').value);

  if (!distance) {
    document.querySelector('#time').value = null;
    document.querySelector('#pace').value = null;
  }

  // Calculate the pace if time and distance are provided
  else if (time) {
    const pace = time / distance;
    document.querySelector('#pace').value = pace.toFixed(2);
  }

  // Calculate the time if distance and pace are provided
  else if (pace) {
    const time = distance * pace
    document.querySelector('#time').value = time.toFixed(2);
  }
}

const distanceInput = document.querySelector("#distance")
distanceInput.addEventListener("input", calculatePaceOnDistanceChange)


function calculatePaceOnPaceChange(event) {
  console.log("calculatePaceOnPaceChange")
  event.preventDefault(); // prevent the form from submitting

  // Get the input values
  const time = Number(document.querySelector('#time').value);
  const distance = Number(document.querySelector('#distance').value);
  const pace = Number(document.querySelector('#pace').value);

  if (!pace) {
    return
  }

  // Calculate the pace if time and distance are provided
  else if (distance) {
    const time = distance * pace;
    document.querySelector('#time').value = time.toFixed(2);
  }

  // Calculate the time if distance and pace are provided
  else if (time) {
    const distance = pace * time
    document.querySelector('#distance').value = distance.toFixed(2);
  }
}

const paceInput = document.querySelector("#pace")
paceInput.addEventListener("input", calculatePaceOnPaceChange)
