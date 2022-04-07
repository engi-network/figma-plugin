import { Report } from '~/app/models/Report'
import {
  SAME_STORY_CHECK_INITIAL_SELECTION,
  SAME_STORY_FORM_UPDATE,
  SAME_STORY_HISTORY_CREATE_FROM_UI_TO_PLUGIN,
} from '~/plugin/constants'
import { onFormChange } from '~/plugin/modules/form'
import { onHistoryCreate } from '~/plugin/modules/history'
import { onSelection } from '~/plugin/modules/preview'

/**
 *
 * @param event MessageEvent
 * @description all custom events will be handled here
 */

figma.ui.onmessage = async (event: MessageEvent) => {
  switch (event.type) {
    case SAME_STORY_FORM_UPDATE: {
      await onFormChange(event.data)
      break
    }
    case SAME_STORY_HISTORY_CREATE_FROM_UI_TO_PLUGIN: {
      await onHistoryCreate(event.data as Report)
      break
    }
    case SAME_STORY_CHECK_INITIAL_SELECTION: {
      const selection = figma.currentPage.selection[0]
      if (!selection) {
        return
      }

      await onSelection(selection)
      break
    }
    default:
      break
  }
}
