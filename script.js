let defaultTime = 90;
let timeLeft = defaultTime;
let timerInterval = null;

function updateDisplay() {
  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");
  const timer = document.getElementById("timer");

  if (timer) {
    timer.textContent = `${minutes}:${seconds}`;
  }
}

function setTimer(seconds) {
  defaultTime = seconds;
  timeLeft = seconds;
  clearInterval(timerInterval);
  timerInterval = null;
  updateDisplay();
}

function startTimer() {
  if (timerInterval) return;

  timerInterval = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      updateDisplay();
    } else {
      clearInterval(timerInterval);
      timerInterval = null;
      alert("Descanso terminado");
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}

function resetTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  timeLeft = defaultTime;
  updateDisplay();
}

document.addEventListener("DOMContentLoaded", updateDisplay);