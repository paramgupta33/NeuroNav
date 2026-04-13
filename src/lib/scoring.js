export const SOUND_SCORES = {
  quiet: 10,
  'low-hum': 7,
  loud: 3,
  'sudden-noises': 2,
}

export const CROWD_SCORES = {
  empty: 10,
  'spaced-out': 6,
  crowded: 2,
}

export const LIGHTING_SCORES = {
  natural: 10,
  dim: 6,
  'bright-fluorescent': 4,
  flickering: 2,
}

export function scoreDimension(map, value) {
  if (value == null || value === '') return 5
  return map[value] ?? 5
}

export function scoreSingleReport(report) {
  const s =
    (scoreDimension(SOUND_SCORES, report.sound_level) +
      scoreDimension(CROWD_SCORES, report.crowd_level) +
      scoreDimension(LIGHTING_SCORES, report.lighting)) /
    3
  return s
}

export function atmosphereScore(reports) {
  if (!reports.length) return null
  const sum = reports.reduce((acc, r) => acc + scoreSingleReport(r), 0)
  return sum / reports.length
}

export function atmosphereHealthPercent(score) {
  if (score == null) return 0
  return Math.min(100, Math.max(0, (score / 10) * 100))
}

export function atmosphereHealthFill(score) {
  if (score == null) return '#5c3d1e'
  if (score > 7) return '#7ab648'
  if (score >= 4) return '#e8c96d'
  return '#c94c4c'
}
