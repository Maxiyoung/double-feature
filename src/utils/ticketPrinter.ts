import type { DoubleFeatureProgram, TicketTheme } from '../data/programs';

export interface TicketCustomData {
  cinemaName: string;
  screeningDate: string;
  seatCode: string;
  serialNumber: string;
  theme: TicketTheme;
}

export function drawCinemaTicket(
  canvas: HTMLCanvasElement,
  program: DoubleFeatureProgram,
  custom: TicketCustomData
) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const W = 1200;
  const H = 560;
  canvas.width = W;
  canvas.height = H;

  const { theme } = custom;

  // 1. Fondo oscuro de mesa alrededor del ticket para que resalten las muescas troqueladas
  ctx.fillStyle = '#0C0A09';
  ctx.fillRect(0, 0, W, H);

  const margin = 32;
  const tX = margin;
  const tY = margin;
  const tW = W - margin * 2;
  const tH = H - margin * 2;
  const stubX = tX + tW * 0.74; // Línea donde se corta el talón del acomodador

  // 2. Cuerpo de papel del boleto
  ctx.save();
  ctx.fillStyle = theme.paperBg;
  ctx.fillRect(tX, tY, tW, tH);

  // Textura sutil de fibra de papel e imprenta
  for (let i = 0; i < 3800; i++) {
    const px = tX + Math.random() * tW;
    const py = tY + Math.random() * tH;
    ctx.fillStyle =
      theme.id === 'midnight-gold'
        ? 'rgba(255,255,255,0.025)'
        : 'rgba(28, 25, 23, 0.035)';
    ctx.fillRect(px, py, 1.5, 1.5);
  }

  // 3. Muescas circulares troqueladas en las 4 esquinas y en la unión del talón
  const punchHole = (cx: number, cy: number, r: number) => {
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fillStyle = '#0C0A09';
    ctx.fill();
  };

  const cornerR = 22;
  punchHole(tX, tY, cornerR);
  punchHole(tX + tW, tY, cornerR);
  punchHole(tX, tY + tH, cornerR);
  punchHole(tX + tW, tY + tH, cornerR);
  // Muescas del corte troquelado
  punchHole(stubX, tY, 18);
  punchHole(stubX, tY + tH, 18);

  // 4. Marco interior doble estilo boleto antiguo
  const innerPad = 18;
  ctx.strokeStyle = theme.borderInk;
  ctx.lineWidth = 2;
  ctx.strokeRect(
    tX + innerPad,
    tY + innerPad,
    stubX - tX - innerPad * 2,
    tH - innerPad * 2
  );

  // Línea punteada vertical de troquelado
  ctx.save();
  ctx.setLineDash([8, 8]);
  ctx.strokeStyle = theme.borderInk;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(stubX, tY + 22);
  ctx.lineTo(stubX, tY + tH - 22);
  ctx.stroke();
  ctx.restore();

  // 5. Encabezado del Cine (Lado Izquierdo Principal)
  const leftCenter = tX + (stubX - tX) / 2;
  const contentLeft = tX + 44;
  const contentRight = stubX - 44;

  ctx.fillStyle = theme.inkAccent;
  ctx.font = '700 13px "Space Mono", monospace';
  ctx.textAlign = 'center';
  ctx.fillText(
    `★  ${custom.cinemaName.toUpperCase()} · PROGRAMA DOBLE EN CONTINUADO  ★`,
    leftCenter,
    tY + 52
  );

  // Línea separadora superior
  ctx.strokeStyle = theme.borderInk;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(contentLeft, tY + 66);
  ctx.lineTo(contentRight, tY + 66);
  ctx.stroke();

  // Título del Ciclo
  ctx.fillStyle = theme.inkPrimary;
  ctx.font = 'italic 600 22px "Cormorant Garamond", Georgia, serif';
  ctx.fillText(`Ciclo: «${program.cycleTitle}»`, leftCenter, tY + 96);

  // 6. Bloque FUNCIÓN 1 y FUNCIÓN 2
  const drawFilmBlock = (
    yStart: number,
    slotLabel: string,
    timeLabel: string,
    title: string,
    director: string,
    year: number,
    format: string,
    duration: number
  ) => {
    // Badge de horario
    ctx.fillStyle = theme.inkAccent;
    ctx.fillRect(contentLeft, yStart, 138, 26);
    ctx.fillStyle = theme.id === 'midnight-gold' ? '#09090B' : '#FAF8F5';
    ctx.font = '700 11px "Space Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText(`${slotLabel} · ${timeLabel}`, contentLeft + 69, yStart + 17);

    // Formato y duración a la derecha
    ctx.textAlign = 'right';
    ctx.fillStyle = theme.borderInk;
    ctx.font = '400 12px "Space Mono", monospace';
    ctx.fillText(`${format} · ${duration} MIN`, contentRight, yStart + 18);

    // Título de la película
    ctx.textAlign = 'left';
    ctx.fillStyle = theme.inkPrimary;
    ctx.font = '700 36px "Cormorant Garamond", Georgia, serif';
    ctx.fillText(title, contentLeft, yStart + 66);

    // Director y Año
    ctx.fillStyle = theme.inkAccent;
    ctx.font = 'italic 600 18px "Cormorant Garamond", Georgia, serif';
    ctx.fillText(`Dirigida por ${director} (${year})`, contentLeft, yStart + 92);
  };

  drawFilmBlock(
    tY + 118,
    '1ª FUNCIÓN',
    '20:00 HS',
    program.filmA.title,
    program.filmA.director,
    program.filmA.year,
    program.filmA.format,
    program.filmA.durationMin
  );

  // Separador de Intervalo
  ctx.strokeStyle = theme.borderInk;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(contentLeft, tY + 236);
  ctx.lineTo(contentRight, tY + 236);
  ctx.stroke();

  ctx.fillStyle = theme.paperBg;
  ctx.fillRect(leftCenter - 110, tY + 226, 220, 20);
  ctx.fillStyle = theme.borderInk;
  ctx.font = '700 10px "Space Mono", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('— INTERVALO DE 15 MINUTOS —', leftCenter, tY + 240);

  drawFilmBlock(
    tY + 258,
    '2ª FUNCIÓN',
    '22:00 HS',
    program.filmB.title,
    program.filmB.director,
    program.filmB.year,
    program.filmB.format,
    program.filmB.durationMin
  );

  // Pie del lado izquierdo
  ctx.strokeStyle = theme.borderInk;
  ctx.beginPath();
  ctx.moveTo(contentLeft, tY + 382);
  ctx.lineTo(contentRight, tY + 382);
  ctx.stroke();

  const totalMin = program.filmA.durationMin + program.filmB.durationMin + 15;
  ctx.textAlign = 'left';
  ctx.fillStyle = theme.inkPrimary;
  ctx.font = '700 12px "Space Mono", monospace';
  ctx.fillText(`FECHA: ${custom.screeningDate.toUpperCase()}`, contentLeft, tY + 412);

  ctx.textAlign = 'center';
  ctx.fillText(`DURACIÓN TOTAL: ${totalMin} MIN`, leftCenter, tY + 412);

  ctx.textAlign = 'right';
  ctx.fillStyle = theme.inkAccent;
  ctx.fillText(`UBICACIÓN: ${custom.seatCode.toUpperCase()}`, contentRight, tY + 412);

  // Sello circular de filmoteca abajo a la derecha del cuerpo principal
  ctx.save();
  ctx.translate(contentRight - 55, tY + 450);
  ctx.rotate(-0.12);
  ctx.strokeStyle = theme.inkAccent;
  ctx.lineWidth = 1.8;
  ctx.strokeRect(-75, -14, 150, 26);
  ctx.font = '700 10px "Space Mono", monospace';
  ctx.fillStyle = theme.inkAccent;
  ctx.textAlign = 'center';
  ctx.fillText('COPIA ARCHIVO 35MM', 0, 3);
  ctx.restore();

  ctx.textAlign = 'left';
  ctx.fillStyle = theme.borderInk;
  ctx.font = 'italic 400 14px "Cormorant Garamond", Georgia, serif';
  ctx.fillText(
    `«${program.themeAxis.slice(0, 78)}${program.themeAxis.length > 78 ? '...' : ''}»`,
    contentLeft,
    tY + 455
  );

  // 7. Lado Derecho: Talón Troquelado del Acomodador (Stub)
  const stubCenter = stubX + (tX + tW - stubX) / 2;

  ctx.strokeStyle = theme.borderInk;
  ctx.lineWidth = 1.5;
  ctx.strokeRect(
    stubX + 18,
    tY + innerPad,
    tX + tW - stubX - 36,
    tH - innerPad * 2
  );

  ctx.textAlign = 'center';
  ctx.fillStyle = theme.inkAccent;
  ctx.font = '700 12px "Space Mono", monospace';
  ctx.fillText('TALÓN DE CONTROL', stubCenter, tY + 55);

  ctx.fillStyle = theme.inkPrimary;
  ctx.font = '700 28px "Space Mono", monospace';
  ctx.fillText(custom.seatCode.toUpperCase(), stubCenter, tY + 100);

  ctx.font = '400 11px "Space Mono", monospace';
  ctx.fillStyle = theme.borderInk;
  ctx.fillText(custom.screeningDate.toUpperCase(), stubCenter, tY + 125);

  // Resúmenes cortos en el talón
  ctx.fillStyle = theme.inkPrimary;
  ctx.font = '700 18px "Cormorant Garamond", Georgia, serif';
  ctx.fillText('I. ' + program.filmA.title.slice(0, 20), stubCenter, tY + 185);
  ctx.fillText('II. ' + program.filmB.title.slice(0, 20), stubCenter, tY + 225);

  // Código de barras simulado estilo imprenta
  const barStartX = stubCenter - 82;
  const barY = tY + 280;
  let cursorX = barStartX;
  const pattern = [3, 1, 2, 4, 1, 2, 1, 3, 2, 1, 4, 2, 1, 2, 3, 1, 2, 1, 3, 2, 4, 1, 2];

  ctx.fillStyle = theme.inkPrimary;
  for (let i = 0; i < pattern.length; i++) {
    const w = pattern[i] * 2.4;
    if (i % 2 === 0) {
      ctx.fillRect(cursorX, barY, w, 68);
    }
    cursorX += w + 2.5;
  }

  ctx.font = '700 12px "Space Mono", monospace';
  ctx.fillStyle = theme.inkAccent;
  ctx.fillText(`Nº ${custom.serialNumber}`, stubCenter, tY + 375);

  ctx.fillStyle = theme.borderInk;
  ctx.font = '400 10px "Space Mono", monospace';
  ctx.fillText('VÁLIDO PARA 2 FUNCIONES', stubCenter, tY + 435);
  ctx.fillText('CONSERVE ESTE BOLETO', stubCenter, tY + 452);

  ctx.restore();
}
