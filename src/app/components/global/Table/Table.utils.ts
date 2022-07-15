import { History, REPORT_STATUS, ReportResult } from '~/app/models/Report'

import { Cell } from './Table.types'

export const mapHistoryToTable = (history: History): Array<Cell> => {
  return history.map(({ result, status, originalImageUrl = '' }) => {
    const {
      check_id,
      path,
      story,
      repository,
      branch = '',
      commit = '',
      name,
    } = result
    const baseObj = {
      branch,
      checkId: check_id,
      code: {
        codeSnippet: '',
        checkId: check_id,
      },
      commit,
      imageUrl: originalImageUrl,
      name: {
        story,
        path,
      },
      path,
      repository,
      story,
      version: {
        commit,
        branch,
      },
    }

    switch (status) {
      case REPORT_STATUS.ERROR:
      case REPORT_STATUS.SUCCESS: {
        const { created_at, completed_at, code_snippets, MAE } =
          result as ReportResult

        return {
          ...baseObj,
          code: {
            checkId: check_id,
            codeSnippet: code_snippets[0],
            name,
            originalImageUrl,
            status,
          },
          completedAt: completed_at,
          createdAt: created_at,
          //scaling because react-slider can't deal with a large number
          duration: (completed_at - created_at) / 60,
          MAE,
          status,
        }
      }
      case REPORT_STATUS.IN_PROGRESS: {
        const { code_snippets = [] } = result as ReportResult
        return {
          ...baseObj,
          code: {
            checkId: check_id,
            codeSnippet: code_snippets[0] || '',
            name,
            originalImageUrl,
            status: REPORT_STATUS.IN_PROGRESS,
          },
          duration: 0,
          status: REPORT_STATUS.IN_PROGRESS,
        }
      }

      default: {
        return {
          ...baseObj,
          duration: 0,
          status: REPORT_STATUS.FAIL,
        }
      }
    }
  })
}
