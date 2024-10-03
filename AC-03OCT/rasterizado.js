class Punto {
    constructor(x, y) {
        this._x = x; // Encapsulamiento
        this._y = y; // Encapsulamiento
        this.color = this.generarColor(); // Asignar un color aleatorio
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    generarColor() {
        const randColor = () => Math.floor(Math.random() * 256);
        return `rgb(${randColor()}, ${randColor()}, ${randColor()})`; // Generar color RGB aleatorio
    }
}

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

// Función para generar puntos aleatorios
function generarPuntos(cantidad) {
    const puntos = [];
    for (let i = 0; i < cantidad; i++) {
        const x = Math.floor(Math.random() * 400) + 50; // Random x between 50 and 450
        const y = Math.floor(Math.random() * 400) + 50; // Random y between 50 and 450
        puntos.push(new Punto(x, y)); // Crear objeto Punto
    }
    return puntos;
}

// Función para calcular el centroide
function calcularCentroid(puntos) {
    const sumX = puntos.reduce((acc, punto) => acc + punto.x, 0);
    const sumY = puntos.reduce((acc, punto) => acc + punto.y, 0);
    const centerX = sumX / puntos.length;
    const centerY = sumY / puntos.length;
    return new Punto(centerX, centerY);
}

// Función para ordenar los puntos en sentido horario
function ordenarPuntos(puntos, centroid) {
    return puntos.sort((a, b) => {
        const angleA = Math.atan2(a.y - centroid.y, a.x - centroid.x);
        const angleB = Math.atan2(b.y - centroid.y, b.x - centroid.x);
        return angleA - angleB;
    });
}

// Función para dibujar los puntos
function dibujarPuntos(puntos) {
    puntos.forEach(punto => {
        context.fillStyle = punto.color; // Usar el color del punto
        context.beginPath();
        context.arc(punto.x, punto.y, 8, 0, Math.PI * 2); // Dibujar un círculo más grande
        context.fill();
    });
}

// Función para dibujar el polígono
function dibujarPoligono(puntos) {
    context.beginPath();
    context.moveTo(puntos[0].x, puntos[0].y);
    for (const punto of puntos) {
        context.lineTo(punto.x, punto.y);
    }
    context.closePath();
    context.strokeStyle = 'red';
    context.lineWidth = 2;
    context.stroke();
    context.fillStyle = 'rgba(255, 0, 0, 0.5)';
    context.fill();
}

// Función para verificar si el polígono es convexo
function esConvexo(puntos) {
    let sign = 0;
    const n = puntos.length;

    for (let i = 0; i < n; i++) {
        const p1 = puntos[i];
        const p2 = puntos[(i + 1) % n];
        const p3 = puntos[(i + 2) % n];

        const crossProduct = (p2.x - p1.x) * (p3.y - p1.y) - (p2.y - p1.y) * (p3.x - p1.x);

        if (crossProduct !== 0) {
            if (sign === 0) {
                sign = crossProduct > 0 ? 1 : -1;
            } else if ((crossProduct > 0) !== (sign > 0)) {
                return false;
            }
        }
    }
    return true;
}

document.getElementById('generar').addEventListener('click', () => {
    const puntos = generarPuntos(10); // Generar 10 puntos

    const centroid = calcularCentroid(puntos); // Calcular el centroide
    const puntosOrdenados = ordenarPuntos(puntos, centroid); // Ordenar puntos en sentido horario

    context.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas
    dibujarPuntos(puntosOrdenados); // Dibujar los puntos
    dibujarPoligono(puntosOrdenados); // Dibujar el polígono

    const tipo = esConvexo(puntosOrdenados) ? "Convexo" : "Cóncavo";
    document.getElementById('tipo').innerText = `El polígono es: ${tipo}`;
});
