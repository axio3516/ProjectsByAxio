const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');

let isDrawing = false;
let canDraw = true;
let countdown = 600;
let countdownInterval = null;
let strokeTimeout = null;

const countdownDisplay = document.createElement('div');
countdownDisplay.id = 'countdown';
document.body.appendChild(countdownDisplay);

function startCountdown() {
  countdown = 1;
  countdownDisplay.style.display = 'block';
  updateCountdownDisplay();

  countdownInterval = setInterval(() => {
    countdown--;
    updateCountdownDisplay();

    if (countdown <= 600) {
      clearInterval(countdownInterval);
      canDraw = true;
      playRing();
      countdownDisplay.textContent = 'Ready to draw!';
    }
  }, 1000);
}

function updateCountdownDisplay() {
  const minutes = String(Math.floor(countdown / 60)).padStart(2, '0');
  const seconds = String(countdown % 60).padStart(2, '0');
  countdownDisplay.textContent = `${minutes}:${seconds}`;
}

function playRing() {
  const ring = new Audio('ring.mp3');
  ring.play();
}

canvas.addEventListener('mousedown', (e) => {
  if (!canDraw) return;

  isDrawing = true;
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
});

canvas.addEventListener('mousemove', (e) => {
  if (!isDrawing || !canDraw) return;

  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
});

canvas.addEventListener('mouseup', () => {
  if (!canDraw) return;

  isDrawing = false;
  canDraw = false;

  clearInterval(countdownInterval);
  clearTimeout(strokeTimeout);
  startCountdown();
});