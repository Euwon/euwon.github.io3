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

    const rect = canvas.getBoundingClientRect();
    // Assume dpr is already calculated as shown in previous steps
    const dpr = window.devicePixelRatio || 1;
    // Adjusted calculation for x and y coordinates
    const x = (e.clientX - rect.left) * (canvas.width / rect.width / dpr);
    const y = (e.clientY - rect.top) * (canvas.height / rect.height / dpr);

    ctx.lineWidth = 5; // Adjust as necessary
    ctx.lineCap = 'round';
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
}


canvas.addEventListener('pointerdown', startPosition);
canvas.addEventListener('pointerup', finishedPosition);
canvas.addEventListener('pointermove', draw);
