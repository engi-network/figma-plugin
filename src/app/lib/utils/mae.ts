const THRESHOLD = 50

export function isSameStory(mae: string): boolean {
  return Number(mae.split(' ')[0]) < THRESHOLD
}
