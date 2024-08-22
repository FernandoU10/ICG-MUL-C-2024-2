const lienzo = document.getElementById('lienzo');
const ctx = lienzo.getContext('2d');

document.getElementById('botón-dibujar').addEventListener('click', (e) => {
  e.preventDefault();
  e.stopPropagation();

  const forma = document.getElementById('forma').value;
  const x = parseInt(document.getElementById('x-coordenada').value);
  const y = parseInt(document.getElementById('y-coordenada').value);
  const radio = parseInt(document.getElementById('radio').value);
  const lados = parseInt(document.getElementById('lados').value);
  const colorRelleno = document.getElementById('color-relleno').value;
  const colorBorde = document.getElementById('color-borde').value;

  ctx.clearRect(0, 0, lienzo.width, lienzo.height);

  switch (forma) {
    case 'círculo':
      ctx.beginPath();
      ctx.arc(x, y, radio, 0, 2 * Math.PI);
      ctx.fillStyle = colorRelleno;
      ctx.fill();
      ctx.strokeStyle = colorBorde;
      ctx.stroke();
      break;
    case 'cuadrado':
      ctx.fillStyle = colorRelleno;
      ctx.fillRect(x - radio, y - radio, radio * 2, radio * 2);
      ctx.strokeStyle = colorBorde;
      ctx.strokeRect(x - radio, y - radio, radio * 2, radio * 2);
      break;
    case 'triángulo':
      ctx.beginPath();
      ctx.moveTo(x, y - radio);
      ctx.lineTo(x - radio, y + radio);
      ctx.lineTo(x + radio, y + radio);
      ctx.closePath();
      ctx.fillStyle = colorRelleno;
      ctx.fill();
      ctx.strokeStyle = colorBorde;
      ctx.stroke();
      break;
    case 'polígono':
      ctx.beginPath();
      for (let i = 0; i < lados; i++) {
        const ángulo = (2 * Math.PI * i) / lados;
        const px = x + radio * Math.cos(ángulo);
        const py = y + radio * Math.sin(ángulo);
        ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fillStyle = colorRelleno;
      ctx.fill();
      ctx.strokeStyle = colorBorde;
      ctx.stroke();
      break;