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
    ctx.beginPath(); // Begin a new path
    ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop); // Move to the starting point without drawing a line
    draw(e); // Draw immediately on click without moving mouse
}

function startPosition(e) {
    painting = true;
    ctx.beginPath();
}

function draw(e) {
    if (!painting) return;

    ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop); // Draw a line to the new position
    ctx.stroke(); // Render the line
    ctx.beginPath(); // Begin a new path to avoid drawing from the last dot directly
    ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop); // Move to this position to start the next line

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

function finishedPosition() {
    painting = false;
    // Reset/clean up drawing state as needed
}


canvas.addEventListener('pointerdown', startPosition);
canvas.addEventListener('pointermove', draw);
canvas.addEventListener('pointerup', finishedPosition);
canvas.addEventListener('pointerleave', finishedPosition); // Optional, to handle the pen leaving the canvas
