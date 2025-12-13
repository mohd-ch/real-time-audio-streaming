const canvas = document.getElementById("visualizer");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 400;

function startVisualizer(analyser, dataArray, isRunningFn) {
    function draw() {
        if (!isRunningFn()) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            return;
        }

        requestAnimationFrame(draw);
        analyser.getByteFrequencyData(dataArray);

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = 100;
        const bars = dataArray.length;

        for (let i = 0; i < bars; i++) {
            const angle = (i / bars) * Math.PI * 2;
            const barHeight = dataArray[i] / 2;

            const x1 = centerX + Math.cos(angle) * radius;
            const y1 = centerY + Math.sin(angle) * radius;

            const x2 = centerX + Math.cos(angle) * (radius + barHeight);
            const y2 = centerY + Math.sin(angle) * (radius + barHeight);

            ctx.strokeStyle = `hsl(${i * 3}, 100%, 50%)`;
            ctx.lineWidth = 2;

            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
        }
    }

    draw();
}
