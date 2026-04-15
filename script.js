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

function saveExerciseLog(exerciseKey) {
  const pesoInput = document.getElementById(`${exerciseKey}-peso`);
  const repsInput = document.getElementById(`${exerciseKey}-reps`);
  const notaInput = document.getElementById(`${exerciseKey}-nota`);
  const output = document.getElementById(`${exerciseKey}-output`);

  if (!pesoInput || !repsInput || !notaInput || !output) return;

  const data = {
    peso: pesoInput.value.trim(),
    reps: repsInput.value.trim(),
    nota: notaInput.value.trim(),
    fecha: new Date().toLocaleDateString("es-ES")
  };

  localStorage.setItem(`gym-${exerciseKey}`, JSON.stringify(data));
  renderExerciseLog(exerciseKey);
}

function renderExerciseLog(exerciseKey) {
  const output = document.getElementById(`${exerciseKey}-output`);
  if (!output) return;

  const saved = localStorage.getItem(`gym-${exerciseKey}`);

  if (!saved) {
    output.textContent = "Sin registro guardado todavía.";
    return;
  }

  const data = JSON.parse(saved);

  output.innerHTML = `
    <strong>Último registro:</strong><br>
    Peso: ${data.peso || "-"} kg<br>
    Reps: ${data.reps || "-"}<br>
    Nota: ${data.nota || "-"}<br>
    Fecha: ${data.fecha || "-"}
  `;

  const pesoInput = document.getElementById(`${exerciseKey}-peso`);
  const repsInput = document.getElementById(`${exerciseKey}-reps`);
  const notaInput = document.getElementById(`${exerciseKey}-nota`);

  if (pesoInput) pesoInput.value = data.peso || "";
  if (repsInput) repsInput.value = data.reps || "";
  if (notaInput) notaInput.value = data.nota || "";
}

function clearExerciseLog(exerciseKey) {
  localStorage.removeItem(`gym-${exerciseKey}`);

  const pesoInput = document.getElementById(`${exerciseKey}-peso`);
  const repsInput = document.getElementById(`${exerciseKey}-reps`);
  const notaInput = document.getElementById(`${exerciseKey}-nota`);
  const output = document.getElementById(`${exerciseKey}-output`);

  if (pesoInput) pesoInput.value = "";
  if (repsInput) repsInput.value = "";
  if (notaInput) notaInput.value = "";

  if (output) {
    output.textContent = "Sin registro guardado todavía.";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  updateDisplay();

const exercises = [
  "lunes-banca",
  "lunes-inclinado",
  "lunes-militar",
  "lunes-laterales",
  "lunes-triceps",
  "martes-jalon",
  "martes-remo",
  "martes-facepull",
  "martes-bayesian",
  "martes-martillo",
  "sentadilla",
  "prensa",
  "bulgara",
  "extensiones",
  "femoral",
  "gemelo",
  "jueves-inclinado",
  "jueves-militar",
  "jueves-horizontal",
  "jueves-laterales",
  "jueves-triceps",
  "viernes-dominadas",
  "viernes-remot",
  "viernes-reverse",
  "viernes-polea",
  "viernes-inclinado",
  "sabado-hipthrust",
  "sabado-rumano",
  "sabado-femoral",
  "sabado-abductores",
  "sabado-extensiones",
  "sabado-gemelo"
];

  exercises.forEach(renderExerciseLog);
});