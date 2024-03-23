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
    
    // Adjustment for canvas offset and device pixel ratio
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;    // Relationship bitmap vs. element for X
    const scaleY = canvas.height / rect.height;  // Relationship bitmap vs. element for Y

    const x = (e.clientX - rect.left) * scaleX;  // Scale mouse coordinates after they have
    const y = (e.clientY - rect.top) * scaleY;   // been adjusted to be relative to element

    ctx.lineWidth = 5; // Or whatever logic you use for setting this
    ctx.lineCap = 'round';
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
}

canvas.addEventListener('pointerdown', startPosition);
canvas.addEventListener('pointerup', finishedPosition);
canvas.addEventListener('pointermove', draw);
