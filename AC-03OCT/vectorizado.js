class Punto {
    #x; // Propiedad privada
    #y; // Propiedad privada

    constructor(x, y) {
        this.#x = x;
        this.#y = y;
        this.color = this.generarColor();
    }

    get x() {
        return this.#x; // Getter para x
    }

    get y() {
        return this.#y; // Getter para y
    }

    generarColor() {
        const randColor = () => Math.floor(Math.random() * 256);
        return `rgb(${randColor()}, ${randColor()}, ${randColor()})`;
    }
}

function generarPuntos() {
    const cantidad = Math.floor(Math.random() * 8) + 3; // Entre 3 y 10 puntos
    const puntos = [];
    for (let i = 0; i < cantidad; i++) {
        const x = Math.floor(Math.random() * 400) + 50; // Random x between 50 and 450
        const y = Math.floor(Math.random() * 400) + 50; // Random y between 50 and 450
        puntos.push(new Punto(x, y));
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
        circle.setAttribute("r", 8); // Tamaño de los puntos
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
        svgCanvas.removeChild(svgCanvas.firstChild); // Limpiar el canvas
    }

    const puntos = generarPuntos();
    const centroid = calcularCentroid(puntos);
    const puntosOrdenados = ordenarPuntos(puntos, centroid);

    dibujarPuntos(puntosOrdenados, svgCanvas);
    dibujarPoligono(puntosOrdenados, svgCanvas);

    const tipo = esConvexo(puntosOrdenados) ? "Convexo" : "Cóncavo";
    document.getElementById('tipo').innerText = `El polígono es: ${tipo}`;
});
