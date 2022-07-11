import { isSameStory } from '~/app/lib/utils/mae'
import { History, ReportResult, STATUS } from '~/app/models/Report'

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
      case STATUS.SUCCESS: {
        const { created_at, completed_at, code_snippet, MAE } =
          result as ReportResult

        return {
          ...baseObj,
          code: {
            status: isSameStory(MAE) ? STATUS.SUCCESS : STATUS.FAIL,
            codeSnippet: code_snippet,
            checkId: check_id,
          },
          completedAt: completed_at,
          createdAt: created_at,
          //scaling because react-slider can't deal with a large number
          duration: (completed_at - created_at) / 60,
          MAE,
          status: isSameStory(MAE) ? STATUS.SUCCESS : STATUS.FAIL,
        }
      }
      case STATUS.IN_PROGRESS: {
        const { code_snippet } = result as ReportResult
        return {
          ...baseObj,
          code: {
            status: STATUS.IN_PROGRESS,
            codeSnippet: code_snippet,
            checkId: check_id,
          },
          duration: 0,
          status: STATUS.IN_PROGRESS,
        }
      }
      case STATUS.FAIL: {
        return {
          ...baseObj,
          duration: 0,
          status: STATUS.FAIL,
        }
      }
      default: {
        return {
          ...baseObj,
          duration: 0,
          status: STATUS.FAIL,
        }
      }
    }
  })
}
