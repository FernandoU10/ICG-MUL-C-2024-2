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

function generarPuntos(cantidad) {
    const puntos = [];
    for (let i = 0; i < cantidad; i++) {
        const x = Math.floor(Math.random() * 400) + 50; // Random x between 50 and 450
        const y = Math.floor(Math.random() * 400) + 50; // Random y between 50 and 450
        puntos.push(new Punto(x, y)); // Crear objeto Punto
    }
    return puntos;
}

function calcularCentroid(puntos) {
    const sumX = puntos.reduce((acc, punto) => acc + punto.x, 0);
    const sumY = puntos.reduce((acc, punto) => acc + punto.y, 0);
    const centerX = sumX / puntos.length;
    const centerY = sumY / puntos.length;
    return new Punto(centerX, centerY);
}

function ordenarPuntos(puntos, centroid) {
    return puntos.sort((a, b) => {
        const angleA = Math.atan2(a.y - centroid.y, a.x - centroid.x);
        const angleB = Math.atan2(b.y - centroid.y, b.x - centroid.x);
        return angleA - angleB;
    });
}

function dibujarPuntos(puntos, svgCanvas) {
    puntos.forEach(punto => {
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", punto.x);
        circle.setAttribute("cy", punto.y);
        circle.setAttribute("r", 5); // Tamaño de los puntos
        circle.setAttribute("fill", punto.color); // Color del punto
        svgCanvas.appendChild(circle);
    });
}

function dibujarPoligono(puntos, svgCanvas) {
    const polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    const pointsAttr = puntos.map(p => `${p.x},${p.y}`).join(" ");
    polygon.setAttribute("points", pointsAttr);
    polygon.setAttribute("stroke", "red");
    polygon.setAttribute("fill", "rgba(255, 0, 0, 0.5)");
    polygon.setAttribute("stroke-width", "2");
    svgCanvas.appendChild(polygon);
}

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
    const svgCanvas = document.getElementById('svgCanvas');
    while (svgCanvas.firstChild) {
        svgCanvas.removeChild(svgCanvas.firstChild); // Limpiar el SVG
    }
    const puntos = generarPuntos(10); // Generar 10 puntos

    const centroid = calcularCentroid(puntos); // Calcular el centroide
    const puntosOrdenados = ordenarPuntos(puntos, centroid); // Ordenar puntos en sentido horario

    dibujarPuntos(puntosOrdenados, svgCanvas); // Dibujar los puntos
    dibujarPoligono(puntosOrdenados, svgCanvas); // Dibujar el polígono

    const tipo = esConvexo(puntosOrdenados) ? "Convexo" : "Cóncavo";
    document.getElementById('tipo').innerText = `El polígono es: ${tipo}`;
});
