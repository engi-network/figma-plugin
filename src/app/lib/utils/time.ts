export function convertDateToUnix(input: string): number {
  return Math.floor(new Date(input).getTime() / 1000)
}

export function convertUnixTDate(input: number): string {
  return new Date(input * 1000).toLocaleDateString()
}
