import {
  SAME_STORY_FORM_UPDATE,
  SAME_STORY_HISTORY_CREATE_FROM_UI_TO_PLUGIN,
} from '~/plugin/constants'
import { onFormChange } from '~/plugin/modules/form'
import { onHistoryCreate } from '~/plugin/modules/history'

/**
 *
 * @param event MessageEvent
 * @description all event will be handled here
 */

figma.ui.onmessage = async (event: MessageEvent) => {
  switch (event.type) {
    case SAME_STORY_FORM_UPDATE: {
      await onFormChange(event.data)
      break
    }
    case SAME_STORY_HISTORY_CREATE_FROM_UI_TO_PLUGIN: {
      await onHistoryCreate(event.data.report)
      break
    }
    default:
      break
  }
}
