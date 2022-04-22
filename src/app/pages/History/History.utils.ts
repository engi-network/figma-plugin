import { DetailedReport } from '~/app/models/Report'

export const extractBranchNames = (
  history: Array<DetailedReport>,
): Array<string> => {
  return history.reduce((prev, { result: { branch } }) => {
    if (prev.includes(branch + '')) {
      return prev
    }

    prev.push(branch + '')
    return prev
  }, [] as Array<string>)
}
