class Cartesiana {
    constructor(x, y) {
        this._x = x;
        this._y = y;
    }

    get x() {
        return this._x;
    }

    set x(valor) {
        this._x = valor;
    }

    get y() {
        return this._y;
    }

    set y(valor) {
        this._y = valor;
    }
}

class Poligono {
    constructor(n, lado, apotema, centro) {
        this._n = n;
        this._lado = lado;
        this._apotema = apotema;
        this._centro = centro;
    }

    get n() {
        return this._n;
    }

    set n(valor) {
        this._n = valor;
    }

    get lado() {
        return this._lado;
    }

    set lado(valor) {
        this._lado = valor;
    }

    get apotema() {
        return this._apotema;
    }

    set apotema(valor) {
        this._apotema = valor;
    }

    get centro() {
        return this._centro;
    }

    set centro(valor) {
        this._centro = valor;
    }

    // Método para calcular el lado a partir del apotema
    calcularLado() {
        return 2 * this._apotema * Math.tan(Math.PI / this._n);
    }

    // Método para calcular el apotema a partir del lado
    calcularApotema() {
        return this._lado / (2 * Math.tan(Math.PI / this._n));
    }

    // Método para dibujar el polígono
    dibujar(canvas) {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Calcular el radio del círculo circunscrito
        const radio = this._lado / (2 * Math.sin(Math.PI / this._n));

        // Dibujar el polígono
        ctx.beginPath();
        for (let i = 0; i < this._n; i++) {
            const angle = (i / this._n) * 2 * Math.PI;
            const px = this._centro.x + radio * Math.cos(angle);
            const py = this._centro.y + radio * Math.sin(angle);
            if (i === 0) {
                ctx.moveTo(px, py);
            } else {
                ctx.lineTo(px, py);
            }
        }
        ctx.closePath();
        ctx.stroke();
    }
}

function actualizarFormulario() {
    const tipo = document.getElementById('tipo').value;
    if (tipo === 'lado') {
        document.getElementById('medida').style.display = 'block';
        document.getElementById('apotemaMedida').style.display = 'none';
    } else {
        document.getElementById('medida').style.display = 'none';
        document.getElementById('apotemaMedida').style.display = 'block';
    }
}

function dibujarPoligono() {
    const n = parseInt(document.getElementById('n').value);
    const tipo = document.getElementById('tipo').value;
    const x = parseInt(document.getElementById('x').value);
    const y = parseInt(document.getElementById('y').value);
    const centro = new Cartesiana(x, y);

    let lado, apotema;
    if (tipo === 'lado') {
        lado = parseFloat(document.getElementById('lado').value);
        apotema = null;
    } else {
        apotema = parseFloat(document.getElementById('apotema').value);
        lado = null;
    }

    // Calcula el lado si se ingresó el apotema, o el apotema si se ingresó el lado
    if (lado === null) {
        lado = 2 * apotema * Math.tan(Math.PI / n);
    } else {
        apotema = lado / (2 * Math.tan(Math.PI / n));
    }

    const poligono = new Poligono(n, lado, apotema, centro);
    const canvas = document.getElementById('canvas');
    poligono.dibujar(canvas);
}

// Inicializar el formulario en la carga de la página
window.onload = actualizarFormulario;
