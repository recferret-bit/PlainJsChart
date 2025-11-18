const canvas1 = document.getElementById("canvas1");
const canvas2 = document.getElementById("canvas2");
const ctx1 = canvas1.getContext('2d');
const ctx2 = canvas2.getContext('2d');

const chartPositionsX = [50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800];
const chartPositionsY = [100, 60, 50, 100, 120, 200, 90, 160, 220, 300, 400, 350, 320, 300, 250, 100];

const maxHeight = 800, maxWidth = 800;
const lineWidthPixels = 1;

drawCoordinates();

const firstPosCoords = translateCoordinates(10, 5);
ctx1.beginPath();
ctx1.moveTo(firstPosCoords.x, firstPosCoords.y);

drawChart();

function drawChart() {
    let t = 0;
    let i = 0;

    const drawingInterwal = setInterval(() => {
        if (t < 1) {
            const startCoords = i == 0 ? firstPosCoords : translateCoordinates(chartPositionsX[i - 1], chartPositionsY[i - 1]);
            const endCoords = translateCoordinates(chartPositionsX[i], chartPositionsY[i]);

            const interpolatedCoordsX = lerp(startCoords.x, endCoords.x, t);
            const interpolatedCoordsY = lerp(startCoords.y, endCoords.y, t);

            ctx1.strokeStyle = 'blue';
            ctx1.lineWidth = 2;
            ctx1.lineCap = 'round';
            ctx1.lineTo(interpolatedCoordsX, interpolatedCoordsY);

            ctx1.stroke();

            t += 0.3;
        } else {
            if (i == chartPositionsX.length) {
                clearInterval(drawingInterwal);
            } else {
                const startCoords = i == 0 ? firstPosCoords : translateCoordinates(chartPositionsX[i - 1], chartPositionsY[i - 1]);
                const endCoords = translateCoordinates(chartPositionsX[i], chartPositionsY[i]);
                const x1 = startCoords.x, x2 = endCoords.x;
                const y1 = startCoords.y, y2 = endCoords.y;
                const dx = x2 - x1;
                const dy = y2 - y1;
                let x = x1;
                let y = y1;

                do {
                    drawVerticalLine(x, y);

                    y = y1 + dy * (x - x1) / dx;
                    x += 1;

                } while (x < x2)

                t = 0;
                i++;
            }
        }
    }, 16);
}


function drawCoordinates() {
    ctx1.strokeStyle = 'black';
    ctx1.lineWidth = 3;

    ctx1.beginPath();
    ctx1.moveTo(10, 10);
    ctx1.lineTo(10, 800);
    ctx1.lineTo(810, 800);
    ctx1.stroke();
}

function drawVerticalLine(fromX, fromY) {
    const toX = fromX, toY = maxHeight;
    const gradient = ctx2.createLinearGradient(fromX, fromY, toX, toY);

    gradient.addColorStop(0, "rgba(0, 0, 255, 0.3)");
    gradient.addColorStop(1, "rgba(0, 0, 255, 0.1)");

    ctx2.lineWidth = 2;
    ctx2.strokeStyle = gradient;
    ctx2.beginPath();
    ctx2.moveTo(fromX, fromY);
    ctx2.lineTo(toX, toY);
    ctx2.stroke();

    console.log(drawVerticalLine);
}

function translateCoordinates(x1, y1) {
    return {
        x: x1,
        y: maxHeight - y1
    }
}

function lerp(x, y, a) {
    return x * (1 - a) + y * a;
}