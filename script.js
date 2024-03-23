const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let painting = false;

function startPosition(e) {
    painting = true;
    draw(e); // Draw immediately on click without moving mouse
}

function finishedPosition() {
    painting = false;
    ctx.beginPath(); // Begin a new path to start drawing a new stroke
}

function draw(e) {
    if (!painting) return;
    ctx.lineWidth = 5; // You could modify this based on e.pressure if needed
    ctx.lineCap = 'round'; // Round line endings for a smoother look
    ctx.lineTo(e.clientX, e.clientY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX, e.clientY);
}

canvas.addEventListener('pointerdown', startPosition);
canvas.addEventListener('pointerup', finishedPosition);
canvas.addEventListener('pointermove', draw);
