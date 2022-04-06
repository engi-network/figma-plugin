import {
  SAME_STORY_HISTORY_CREATE,
  SAME_STORY_HISTORY_LIST,
  SAME_STORY_HISTORY_REMOVE,
  SAME_STORY_HISTORY_UPDATE,
} from '~/plugin/constants'

figma.ui.onmessage = (event: MessageEvent) => {
  switch (event.type) {
    case SAME_STORY_HISTORY_CREATE:
      console.info('event.data=====>', event.data)
      break
    case SAME_STORY_HISTORY_REMOVE:
      break
    case SAME_STORY_HISTORY_LIST:
      break
    case SAME_STORY_HISTORY_UPDATE:
      break
    default:
      break
  }
}
