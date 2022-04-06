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

figma.ui.onmessage = (event: MessageEvent) => {
  switch (event.type) {
    case SAME_STORY_FORM_UPDATE: {
      console.info('form change====>')
      onFormChange(event.data)
      break
    }
    case SAME_STORY_HISTORY_CREATE_FROM_UI_TO_PLUGIN: {
      onHistoryCreate(event.data)
      console.info('event.data=====>', event.data)
      break
    }
    default:
      break
  }
}
