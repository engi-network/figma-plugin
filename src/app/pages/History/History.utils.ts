import { Report } from '~/app/models/Report'

export const extractBranchNames = (history: Array<Report>): Array<string> => {
  return history.reduce((prev, { result: { branch } }) => {
    if (!branch || prev.includes(branch)) {
      return prev
    }

    prev.push(branch)
    return prev
  }, [] as Array<string>)
}
