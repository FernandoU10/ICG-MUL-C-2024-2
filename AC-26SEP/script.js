const svg = document.getElementById('svg');

class Punto {
    #x;
    #y;

    constructor(x, y) {
        this.#x = x;
        this.#y = y;
    }

    getX() {
        return this.#x;
    }

    getY() {
        return this.#y;
    }
}

class Linea {
    #punto1;
    #punto2;

    constructor(punto1, punto2) {
        this.#punto1 = punto1;
        this.#punto2 = punto2;
    }

    dibujar() {
        const puntos = this.bresenham();
        puntos.forEach(punto => {
            const pixel = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            pixel.setAttribute("cx", punto.x);
            pixel.setAttribute("cy", punto.y);
            pixel.setAttribute("r", 1); // Radio del punto
            pixel.setAttribute("fill", "black");
            svg.appendChild(pixel);
        });
    }

    bresenham() {
        const puntos = [];
        let x1 = this.#punto1.getX();
        let y1 = this.#punto1.getY();
        const x2 = this.#punto2.getX();
        const y2 = this.#punto2.getY();

        const dx = Math.abs(x2 - x1);
        const dy = Math.abs(y2 - y1);
        const sx = (x1 < x2) ? 1 : -1;
        const sy = (y1 < y2) ? 1 : -1;
        let err = dx - dy;

        while (true) {
            puntos.push({ x: x1, y: y1 });
            if (x1 === x2 && y1 === y2) break;
            const err2 = err * 2;
            if (err2 > -dy) {
                err -= dy;
                x1 += sx;
            }
            if (err2 < dx) {
                err += dx;
                y1 += sy;
            }
        }
        return puntos;
    }
}

class Circunferencia {
    #centro;
    #r;

    constructor(centro, r) {
        this.#centro = centro;
        this.#r = r;
    }

    dibujar() {
        const circunferencia = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circunferencia.setAttribute("cx", this.#centro.getX());
        circunferencia.setAttribute("cy", this.#centro.getY());
        circunferencia.setAttribute("r", this.#r);
        circunferencia.setAttribute("fill", "none");
        circunferencia.setAttribute("stroke", "black");
        svg.appendChild(circunferencia);
    }
}

class Elipse {
    #centro;
    #a;
    #b;

    constructor(centro, a, b) {
        this.#centro = centro;
        this.#a = a;
        this.#b = b;
    }

    dibujar() {
        const elipse = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
        elipse.setAttribute("cx", this.#centro.getX());
        elipse.setAttribute("cy", this.#centro.getY());
        elipse.setAttribute("rx", this.#a);
        elipse.setAttribute("ry", this.#b);
        elipse.setAttribute("fill", "none");
        elipse.setAttribute("stroke", "black");
        svg.appendChild(elipse);
    }
}

// Crear y dibujar las primitivas
const punto1 = new Punto(50, 50);
const punto2 = new Punto(300, 200);
const linea = new Linea(punto1, punto2);
linea.dibujar();

const centroCircunferencia = new Punto(400, 100);
const circunferencia = new Circunferencia(centroCircunferencia, 50);
circunferencia.dibujar();

const centroElipse = new Punto(250, 300);
const elipse = new Elipse(centroElipse, 80, 50);
elipse.dibujar();
