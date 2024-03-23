const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');

// This accounts for device pixel ratio, improving accuracy on high-res screens
const dpr = window.devicePixelRatio || 1;
canvas.width = window.innerWidth * dpr;
canvas.height = window.innerHeight * dpr;
canvas.style.width = window.innerWidth + 'px';
canvas.style.height = window.innerHeight + 'px';
ctx.scale(dpr, dpr);

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
