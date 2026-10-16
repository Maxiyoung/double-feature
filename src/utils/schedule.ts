export const INTERVAL_MIN = 15;

export interface Schedule {
  firstStart: string;
  secondStart: string;
  end: string;
  endsNextDay: boolean;
  totalMin: number;
}

function toMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number);
  if (!Number.isFinite(h) || !Number.isFinite(m)) return 20 * 60;
  return h * 60 + m;
}

function formatTime(totalMin: number): string {
  const day = 24 * 60;
  const normalized = ((totalMin % day) + day) % day;
  const h = Math.floor(normalized / 60);
  const m = normalized % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

export function computeSchedule(
  startTime: string,
  durationA: number,
  durationB: number
): Schedule {
  const start = toMinutes(startTime);
  const secondStart = start + durationA + INTERVAL_MIN;
  const end = secondStart + durationB;

  return {
    firstStart: formatTime(start),
    secondStart: formatTime(secondStart),
    end: formatTime(end),
    endsNextDay: end >= 24 * 60,
    totalMin: durationA + durationB + INTERVAL_MIN,
  };
}
