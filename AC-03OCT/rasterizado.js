class Punto {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Poligono {
    constructor(puntos) {
        this.puntos = puntos;
    }

    esConvexo() {
        const cross = (o, a, b) => (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);
        let sign = 0;
        const n = this.puntos.length;

        for (let i = 0; i < n; i++) {
            const d = cross(this.puntos[i], this.puntos[(i + 1) % n], this.puntos[(i + 2) % n]);
            if (d !== 0) {
                if (sign === 0) {
                    sign = d > 0 ? 1 : -1;
                } else if (sign * d < 0) {
                    return false;
                }
            }
        }
        return true;
    }

    trazarVectorizado() {
        const svgContainer = document.getElementById("svgPolygon");
        let points = this.puntos.map(p => `${p.x},${p.y}`).join(" ");
        const polygon = `<polygon points="${points}" style="fill: rgba(0, 255, 0, 0.5); stroke: blue; stroke-width: 2;" />`;
        svgContainer.innerHTML = polygon;
    }

    trazarRasterizado(ctx) {
        ctx.fillStyle = "rgba(0, 255, 0, 0.5)";
        ctx.beginPath();
        this.puntos.forEach((punto, index) => {
            if (index === 0) {
                ctx.moveTo(punto.x, punto.y);
            } else {
                ctx.lineTo(punto.x, punto.y);
            }
        });
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = "blue";
        ctx.stroke();
    }

    dibujar(ctx) {
        this.trazarRasterizado(ctx);
    }
}

function main() {
    const puntos = [
        new Punto(50, 50),
        new Punto(150, 50),
        new Punto(150, 150),
        new Punto(100, 100),
        new Punto(50, 150)
    ];
    
    const poligono = new Poligono(puntos);
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    // Determinar si es cóncavo o convexo
    const tipo = poligono.esConvexo() ? "Convexo" : "Cóncavo";
    document.getElementById("tipo").innerText = `Tipo de polígono: ${tipo}`;
    
    // Dibujar el polígono en ambos formatos
    poligono.trazarVectorizado();
    poligono.dibujar(ctx);
}

window.onload = main;
