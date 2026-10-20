import type { DoubleFeatureProgram, FilmEntry, TicketTheme } from '../data/programs';
import { computeSchedule } from './schedule';

export interface TicketCustomData {
  cinemaName: string;
  screeningDate: string;
  startTime: string;
  seatCode: string;
  serialNumber: string;
  theme: TicketTheme;
}

const SERIF = '"Cormorant Garamond", Georgia, serif';
const MONO = '"Space Mono", monospace';

function hashSeed(text: string): number {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed: number): () => number {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

let cachedNoiseKey = '';
let cachedNoiseCanvas: HTMLCanvasElement | null = null;

function getPaperNoiseCanvas(
  width: number,
  height: number,
  themeId: string
): HTMLCanvasElement | null {
  const key = `${width}x${height}-${themeId}`;
  if (cachedNoiseKey === key && cachedNoiseCanvas) {
    return cachedNoiseCanvas;
  }

  if (typeof document === 'undefined') return null;
  const offscreen = document.createElement('canvas');
  offscreen.width = width;
  offscreen.height = height;
  const nCtx = offscreen.getContext('2d');
  if (!nCtx) return null;

  const rand = mulberry32(hashSeed(`paper-grain-${themeId}`));
  nCtx.fillStyle =
    themeId === 'midnight-gold' ? 'rgba(255,255,255,0.025)' : 'rgba(28, 25, 23, 0.035)';
  for (let i = 0; i < 3800; i++) {
    nCtx.fillRect(rand() * width, rand() * height, 1.5, 1.5);
  }

  cachedNoiseKey = key;
  cachedNoiseCanvas = offscreen;
  return offscreen;
}

function drawFittedText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  maxSize: number,
  minSize: number,
  buildFont: (size: number) => string
) {
  let size = maxSize;
  ctx.font = buildFont(size);
  while (size > minSize && ctx.measureText(text).width > maxWidth) {
    size -= 1;
    ctx.font = buildFont(size);
  }

  let out = text;
  if (ctx.measureText(out).width > maxWidth) {
    const words = out.split(' ');
    let current = '';
    for (const word of words) {
      const candidate = current ? `${current} ${word}` : word;
      if (ctx.measureText(`${candidate}…`).width > maxWidth) break;
      current = candidate;
    }
    out = current ? `${current}…` : `${out.slice(0, 14).trimEnd()}…`;
  }

  ctx.fillText(out, x, y);
}

export function drawCinemaTicket(
  canvas: HTMLCanvasElement,
  program: DoubleFeatureProgram,
  custom: TicketCustomData
) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const SCALE = 2;
  const W = 1200;
  const H = 560;
  if (canvas.width !== W * SCALE || canvas.height !== H * SCALE) {
    canvas.width = W * SCALE;
    canvas.height = H * SCALE;
  }

  ctx.save();
  ctx.scale(SCALE, SCALE);

  const { theme } = custom;
  const schedule = computeSchedule(
    custom.startTime,
    program.filmA.durationMin,
    program.filmB.durationMin
  );

  const mono700 = (s: number) => `700 ${s}px ${MONO}`;
  const mono400 = (s: number) => `400 ${s}px ${MONO}`;
  const serif700 = (s: number) => `700 ${s}px ${SERIF}`;

  ctx.fillStyle = '#0C0A09';
  ctx.fillRect(0, 0, W, H);

  const margin = 32;
  const tX = margin;
  const tY = margin;
  const tW = W - margin * 2;
  const tH = H - margin * 2;
  const stubX = tX + tW * 0.74;

  ctx.fillStyle = theme.paperBg;
  ctx.fillRect(tX, tY, tW, tH);

  const noiseLayer = getPaperNoiseCanvas(tW, tH, theme.id);
  if (noiseLayer) {
    ctx.drawImage(noiseLayer, tX, tY, tW, tH);
  }

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
  punchHole(stubX, tY, 18);
  punchHole(stubX, tY + tH, 18);

  const innerPad = 18;
  ctx.strokeStyle = theme.borderInk;
  ctx.lineWidth = 2;
  ctx.strokeRect(
    tX + innerPad,
    tY + innerPad,
    stubX - tX - innerPad * 2,
    tH - innerPad * 2
  );

  ctx.save();
  ctx.setLineDash([8, 8]);
  ctx.strokeStyle = theme.borderInk;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(stubX, tY + 22);
  ctx.lineTo(stubX, tY + tH - 22);
  ctx.stroke();
  ctx.restore();

  const leftCenter = tX + (stubX - tX) / 2;
  const contentLeft = tX + 44;
  const contentRight = stubX - 44;
  const contentWidth = contentRight - contentLeft;

  ctx.fillStyle = theme.inkAccent;
  ctx.textAlign = 'center';
  drawFittedText(
    ctx,
    `★  ${custom.cinemaName.toUpperCase()} · PROGRAMA DOBLE EN CONTINUADO  ★`,
    leftCenter,
    tY + 52,
    contentWidth,
    13,
    9,
    mono700
  );

  ctx.strokeStyle = theme.borderInk;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(contentLeft, tY + 66);
  ctx.lineTo(contentRight, tY + 66);
  ctx.stroke();

  ctx.fillStyle = theme.inkPrimary;
  ctx.textAlign = 'center';
  drawFittedText(
    ctx,
    `Ciclo: «${program.cycleTitle}»`,
    leftCenter,
    tY + 96,
    contentWidth,
    22,
    13,
    (s) => `italic 600 ${s}px ${SERIF}`
  );

  const drawFilmBlock = (
    yStart: number,
    slotLabel: string,
    timeLabel: string,
    film: FilmEntry
  ) => {
    const badgeText = `${slotLabel} · ${timeLabel}`;
    ctx.font = mono700(11);
    const badgeW = ctx.measureText(badgeText).width + 24;
    ctx.fillStyle = theme.inkAccent;
    ctx.fillRect(contentLeft, yStart, badgeW, 26);
    ctx.fillStyle = theme.id === 'midnight-gold' ? '#09090B' : '#FAF8F5';
    ctx.textAlign = 'center';
    ctx.fillText(badgeText, contentLeft + badgeW / 2, yStart + 17);

    ctx.textAlign = 'right';
    ctx.fillStyle = theme.borderInk;
    drawFittedText(
      ctx,
      `${film.format} · ${film.durationMin} MIN`,
      contentRight,
      yStart + 18,
      contentWidth - badgeW - 20,
      12,
      9,
      mono400
    );

    ctx.textAlign = 'left';
    ctx.fillStyle = theme.inkPrimary;
    drawFittedText(ctx, film.title, contentLeft, yStart + 66, contentWidth, 36, 16, serif700);

    ctx.fillStyle = theme.inkAccent;
    drawFittedText(
      ctx,
      `Dirigida por ${film.director} (${film.year}) · ${film.country}`,
      contentLeft,
      yStart + 92,
      contentWidth,
      18,
      12,
      (s) => `italic 600 ${s}px ${SERIF}`
    );
  };

  drawFilmBlock(tY + 118, '1ª FUNCIÓN', `${schedule.firstStart} HS`, program.filmA);

  ctx.strokeStyle = theme.borderInk;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(contentLeft, tY + 236);
  ctx.lineTo(contentRight, tY + 236);
  ctx.stroke();

  ctx.fillStyle = theme.paperBg;
  ctx.fillRect(leftCenter - 110, tY + 226, 220, 20);
  ctx.fillStyle = theme.borderInk;
  ctx.font = mono700(10);
  ctx.textAlign = 'center';
  ctx.fillText('— INTERVALO DE 15 MINUTOS —', leftCenter, tY + 240);

  drawFilmBlock(tY + 258, '2ª FUNCIÓN', `${schedule.secondStart} HS`, program.filmB);

  ctx.strokeStyle = theme.borderInk;
  ctx.beginPath();
  ctx.moveTo(contentLeft, tY + 382);
  ctx.lineTo(contentRight, tY + 382);
  ctx.stroke();

  ctx.fillStyle = theme.inkPrimary;
  ctx.textAlign = 'left';
  drawFittedText(
    ctx,
    `FECHA: ${custom.screeningDate.toUpperCase()}`,
    contentLeft,
    tY + 412,
    240,
    12,
    8,
    mono700
  );

  ctx.textAlign = 'center';
  drawFittedText(
    ctx,
    `DURACIÓN TOTAL: ${schedule.totalMin} MIN (FIN ${schedule.end})`,
    leftCenter,
    tY + 412,
    270,
    11,
    8,
    mono700
  );

  ctx.fillStyle = theme.inkAccent;
  ctx.textAlign = 'right';
  drawFittedText(
    ctx,
    `UBICACIÓN: ${custom.seatCode.toUpperCase()}`,
    contentRight,
    tY + 412,
    240,
    12,
    8,
    mono700
  );

  ctx.save();
  ctx.translate(contentRight - 55, tY + 450);
  ctx.rotate(-0.12);
  ctx.strokeStyle = theme.inkAccent;
  ctx.lineWidth = 1.8;
  ctx.strokeRect(-75, -14, 150, 26);
  ctx.font = mono700(10);
  ctx.fillStyle = theme.inkAccent;
  ctx.textAlign = 'center';
  ctx.fillText('COPIA ARCHIVO 35MM', 0, 3);
  ctx.restore();

  ctx.textAlign = 'left';
  ctx.fillStyle = theme.borderInk;
  drawFittedText(
    ctx,
    `«${program.themeAxis}»`,
    contentLeft,
    tY + 455,
    contentWidth - 140,
    14,
    10,
    (s) => `italic 400 ${s}px ${SERIF}`
  );

  const stubCenter = stubX + (tX + tW - stubX) / 2;
  const stubTextWidth = tX + tW - stubX - 36 - 28;

  ctx.strokeStyle = theme.borderInk;
  ctx.lineWidth = 1.5;
  ctx.strokeRect(stubX + 18, tY + innerPad, tX + tW - stubX - 36, tH - innerPad * 2);

  ctx.textAlign = 'center';
  ctx.fillStyle = theme.inkAccent;
  ctx.font = mono700(12);
  ctx.fillText('TALÓN DE CONTROL', stubCenter, tY + 55);

  ctx.fillStyle = theme.inkPrimary;
  drawFittedText(
    ctx,
    custom.seatCode.toUpperCase(),
    stubCenter,
    tY + 100,
    stubTextWidth,
    26,
    12,
    mono700
  );

  ctx.fillStyle = theme.borderInk;
  drawFittedText(
    ctx,
    `${custom.screeningDate.toUpperCase()} · ${schedule.firstStart} HS`,
    stubCenter,
    tY + 125,
    stubTextWidth,
    11,
    8,
    mono400
  );

  ctx.fillStyle = theme.inkPrimary;
  drawFittedText(
    ctx,
    `I. ${program.filmA.title}`,
    stubCenter,
    tY + 185,
    stubTextWidth,
    18,
    10,
    serif700
  );
  drawFittedText(
    ctx,
    `II. ${program.filmB.title}`,
    stubCenter,
    tY + 225,
    stubTextWidth,
    18,
    10,
    serif700
  );

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

  ctx.font = mono700(12);
  ctx.fillStyle = theme.inkAccent;
  ctx.textAlign = 'center';
  ctx.fillText(`Nº ${custom.serialNumber}`, stubCenter, tY + 375);

  ctx.fillStyle = theme.borderInk;
  ctx.font = mono400(10);
  ctx.fillText('VÁLIDO PARA 2 FUNCIONES', stubCenter, tY + 435);
  ctx.fillText('CONSERVE ESTE BOLETO', stubCenter, tY + 452);

  ctx.restore();
}
