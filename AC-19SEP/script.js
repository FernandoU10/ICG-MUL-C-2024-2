const svg = document.getElementById('svg');
//En lugar de crear un contexto de Canvas y dibujar píxeles, aquí estamos creando elementos SVG
class Linea {
    constructor(x1, y1, x2, y2) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }

    dibujar() {
        const linea = document.createElementNS("http://www.w3.org/2000/svg", "line"); 
        linea.setAttribute("x1", this.x1);
        linea.setAttribute("y1", this.y1);
        linea.setAttribute("x2", this.x2);
        linea.setAttribute("y2", this.y2);
        linea.setAttribute("stroke", "black");
        svg.appendChild(linea);
    }
}

class Circunferencia {
    constructor(cx, cy, r) {
        this.cx = cx;
        this.cy = cy;
        this.r = r;
    }

    dibujar() {
        const circunferencia = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circunferencia.setAttribute("cx", this.cx);
        circunferencia.setAttribute("cy", this.cy);
        circunferencia.setAttribute("r", this.r);
        circunferencia.setAttribute("fill", "none");
        circunferencia.setAttribute("stroke", "black");
        svg.appendChild(circunferencia);
    }
}

class Elipse {
    constructor(cx, cy, a, b) {
        this.cx = cx;
        this.cy = cy;
        this.a = a;
        this.b = b;
    }

    dibujar() {
        const elipse = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
        elipse.setAttribute("cx", this.cx);
        elipse.setAttribute("cy", this.cy);
        elipse.setAttribute("rx", this.a);
        elipse.setAttribute("ry", this.b);
        elipse.setAttribute("fill", "none");
        elipse.setAttribute("stroke", "black");
        svg.appendChild(elipse);
    }
}

// Crear instancias y dibujar las primitivas
const linea = new Linea(50, 50, 200, 200);
linea.dibujar();

const circunferencia = new Circunferencia(300, 100, 50);
circunferencia.dibujar();

const elipse = new Elipse(400, 300, 80, 50);
elipse.dibujar();