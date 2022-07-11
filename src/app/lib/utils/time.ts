import { format } from 'date-fns'

export function convertDateToUnix(input: string): number {
  return Math.floor(new Date(input).getTime() / 1000)
}

export function convertUnixToDate(
  input: number,
  formatString = 'MM.dd.yyyy',
): string {
  return format(input * 1000, formatString)
}
