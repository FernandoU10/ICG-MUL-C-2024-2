const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Variables globales
let fillDone = false;

// Dibujar una figura simple
function drawShape() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas
    ctx.fillStyle = 'blue';
    ctx.fillRect(50, 50, 200, 200); // Cuadrado azul
    ctx.fillStyle = 'white';
    ctx.fillRect(120, 120, 80, 80); // Cuadrado blanco
}

// Algoritmo de Relleno por Área
function floodFill() {
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;
    const targetColor = [255, 255, 255]; // Color blanco (área a rellenar)
    const fillColor = [255, 0, 0]; // Color rojo (nuevo color)

    const stack = [];
    const startX = 150; // Coordenadas del punto inicial
    const startY = 150;

    const startIndex = (startY * imgData.width + startX) * 4;
    if (data[startIndex] === targetColor[0] &&
        data[startIndex + 1] === targetColor[1] &&
        data[startIndex + 2] === targetColor[2]) {

        stack.push({ x: startX, y: startY });
        
        while (stack.length) {
            const { x, y } = stack.pop();
            const index = (y * imgData.width + x) * 4;

            if (data[index] === targetColor[0] && 
                data[index + 1] === targetColor[1] && 
                data[index + 2] === targetColor[2]) {

                data[index] = fillColor[0];
                data[index + 1] = fillColor[1];
                data[index + 2] = fillColor[2];
                data[index + 3] = 255; // Opacidad completa

                // Agregar vecinos a la pila
                stack.push({ x: x + 1, y });
                stack.push({ x: x - 1, y });
                stack.push({ x, y: y + 1 });
                stack.push({ x, y: y - 1 });
            }
        }
    }
    ctx.putImageData(imgData, 0, 0);
    fillDone = true; // Indicar que se ha rellenado
}

// Algoritmo de Recorte de Cohen-Sutherland
function clip() {
    if (!fillDone) return; // No recortar si no se ha rellenado

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Redibujar la figura original
    drawShape();

    const xMin = 100, xMax = 300, yMin = 100, yMax = 300; // Ventana de recorte
    ctx.strokeStyle = 'red';
    ctx.strokeRect(xMin, yMin, xMax - xMin, yMax - yMin); // Dibujar ventana de recorte

    // Limpiar el área y dibujar solo lo que está dentro de la ventana
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;

    for (let y = 0; y < canvas.height; y++) {
        for (let x = 0; x < canvas.width; x++) {
            const index = (y * canvas.width + x) * 4;

            // Verificar si el píxel está dentro de la ventana de recorte
            if (x < xMin || x > xMax || y < yMin || y > yMax) {
                data[index + 3] = 0; // Hacer el píxel transparente
            }
        }
    }

    ctx.putImageData(imgData, 0, 0); // Aplicar los cambios al canvas
}

// Códigos de salida para el recorte (no se usan en esta implementación)
function computeOutCode(x, y) {
    let code = 0;
    if (x < 100) code |= 1; // Izquierda
    else if (x > 300) code |= 2; // Derecha
    if (y < 100) code |= 4; // Arriba
    else if (y > 300) code |= 8; // Abajo
    return code;
}

drawShape(); // Dibuja la figura al cargar
