export const GIF_CDN_BASE =
  'https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0'

/** Construye la URL del GIF en jsDelivr a partir del path del repo (ej. pectorals/dumbbell-fly.gif). */
export function gifUrl(file: string): string {
  return `${GIF_CDN_BASE}/${file}`
}
