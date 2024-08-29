const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const coordenadasElement = document.getElementById('coordenadas');
    const apotemaLabel = document.getElementById('apotema-label');

    function dibujarPoligono() {
      const n = parseInt(document.getElementById('n').value);
      const lado = parseInt(document.getElementById('lado').value);
      const centro = document.getElementById('centro').value;

       /**
       * Calcula el apotema del polígono a partir del lado.
       * El apotema es la distancia desde el centro del polígono hasta uno de sus vértices.
       * La fórmula es: apotema = lado / (2 * tan(π / n)),donde lado es la longitud del lado del polígono y n es el número de lados.
       */
      const apotemaCalculado = lado / (2 * Math.tan(Math.PI / n));
      apotemaLabel.textContent = `El apotema es: ${apotemaCalculado}`;

      /**
       * Procesa la coordenada del centro.
       * Si la coordenada es en formato (x, y), la convierte a coordenadas polares (r, θ), aplicando su formula correspondiente es r = sqrt(x^2 + y^2) y θ = atan2(y, x), 
       * donde atan2 es la función arctangente de dos argumentos.
       * Si la coordenada es en formato (r, θ), la convierte a coordenadas cartesianas (x, y). La formula para realizar la convercion es la siguiente: "x = r * cos(θ) y y = r * sin(θ)""
       */
      const centroParts = centro.split(',');
      let centerX, centerY;
      if (centroParts.length === 2) {
        centerX = parseFloat(centroParts[0]);
        centerY = parseFloat(centroParts[1]);
        coordenadasElement.textContent = `Coordenadas cartesianas: (${centerX}, ${centerY})`;
      } else {
        alert('Formato de coordenada del centro inválido');
        return;
      }

      // Calcula el ángulo para que uno de los lados sea horizontal
      const angleOffset = Math.PI / 2 - Math.PI / n;

      // Dibuja el polígono en el canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.moveTo(
        centerX + lado / 2 * Math.cos(angleOffset),
        centerY + lado / 2 * Math.sin(angleOffset)
      );

      for (let i = 1; i < n; i++) {
        ctx.lineTo(
          centerX + lado / 2 * Math.cos(angleOffset + 2 * Math.PI * i / n),
          centerY + lado / 2 * Math.sin(angleOffset + 2 * Math.PI * i / n)
        );
      }

      ctx.closePath();
      ctx.stroke();

      // Dibuja un punto verde en el centro del polígono
      ctx.fillStyle = 'green';
      ctx.beginPath();
      ctx.arc(centerX, centerY, 5, 0, 2 * Math.PI);
      ctx.fill();
    }