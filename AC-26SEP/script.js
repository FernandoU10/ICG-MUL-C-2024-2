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
        const puntos = this.bresenhamCircunferencia();
        puntos.forEach(punto => {
            const pixel = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            pixel.setAttribute("cx", punto.x);
            pixel.setAttribute("cy", punto.y);
            pixel.setAttribute("r", 1); // Radio del punto
            pixel.setAttribute("fill", "black");
            svg.appendChild(pixel);
        });
    }

    bresenhamCircunferencia() {
        const puntos = [];
        let x0 = this.#centro.getX();
        let y0 = this.#centro.getY();
        let x = this.#r;
        let y = 0;
        let err = 0;

        while (x >= y) {
            puntos.push({ x: x0 + x, y: y0 + y });
            puntos.push({ x: x0 + y, y: y0 + x });
            puntos.push({ x: x0 - y, y: y0 + x });
            puntos.push({ x: x0 - x, y: y0 + y });
            puntos.push({ x: x0 - x, y: y0 - y });
            puntos.push({ x: x0 - y, y: y0 - x });
            puntos.push({ x: x0 + y, y: y0 - x });
            puntos.push({ x: x0 + x, y: y0 - y });

            y++;
            err += 1 + 2 * y;
            if (2 * err > 2 * x + 1) {
                x--;
                err -= 2 * x + 1;
            }
        }
        return puntos;
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
        const puntos = this.bresenhamElipse();
        puntos.forEach(punto => {
            const pixel = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            pixel.setAttribute("cx", punto.x);
            pixel.setAttribute("cy", punto.y);
            pixel.setAttribute("r", 1); // Radio del punto
            pixel.setAttribute("fill", "black");
            svg.appendChild(pixel);
        });
    }

    bresenhamElipse() {
        const puntos = [];
        const x0 = this.#centro.getX();
        const y0 = this.#centro.getY();
        const a = this.#a;
        const b = this.#b;

        let x = 0;
        let y = b;
        let a2 = a * a;
        let b2 = b * b;
        let crit1 = b2 - (a2 * b) + (0.25 * a2);
        let crit2 = 0;

        // Primera mitad de la elipse
        while (a2 * (y - 0.5) > b2 * (x + 1)) {
            puntos.push({ x: x0 + x, y: y0 + y });
            puntos.push({ x: x0 - x, y: y0 + y });
            puntos.push({ x: x0 + x, y: y0 - y });
            puntos.push({ x: x0 - x, y: y0 - y });

            if (crit1 < 0) {
                x++;
                crit1 += 2 * b2 * x + b2;
            } else {
                x++;
                y--;
                crit1 += 2 * b2 * x - 2 * a2 * y + b2;
            }
        }

        // Segunda mitad de la elipse
        x = a;
        y = 0;
        crit2 = a2 - (b2 * a) + (0.25 * b2);
        while (b2 * (x - 0.5) > a2 * (y + 1)) {
            puntos.push({ x: x0 + x, y: y0 + y });
            puntos.push({ x: x0 - x, y: y0 + y });
            puntos.push({ x: x0 + x, y: y0 - y });
            puntos.push({ x: x0 - x, y: y0 - y });

            if (crit2 < 0) {
                y++;
                crit2 += 2 * a2 * y + a2;
            } else {
                x--;
                y++;
                crit2 += 2 * a2 * y - 2 * b2 * x + a2;
            }
        }

        return puntos;
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
