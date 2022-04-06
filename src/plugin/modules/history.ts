import { Report } from '~/app/models/Report'
import {
  LOCAL_STORAGE_KEY,
  SAME_STORY_HISTORY_CREATE_FROM_UI_TO_PLUGIN,
  SAME_STORY_HISTORY_LIST_PLUGIN_TO_UI,
  SAME_STORY_HISTORY_REMOVE,
  SAME_STORY_HISTORY_UPDATE,
} from '~/plugin/constants'

const onHistoryCreate = async (data: Report) => {
  await figma.clientStorage.setAsync(LOCAL_STORAGE_KEY.HISTORY, data)
}

figma.ui.onmessage = (event: MessageEvent) => {
  switch (event.type) {
    case SAME_STORY_HISTORY_CREATE_FROM_UI_TO_PLUGIN:
      onHistoryCreate(event.data)
      console.info('event.data=====>', event.data)
      break
    case SAME_STORY_HISTORY_REMOVE:
      break
    case SAME_STORY_HISTORY_UPDATE:
      break
    default:
      break
  }
}

const onRun = async () => {
  const data =
    (await figma.clientStorage.getAsync(LOCAL_STORAGE_KEY.HISTORY)) || []

  figma.ui.postMessage({
    type: SAME_STORY_HISTORY_LIST_PLUGIN_TO_UI,
    data,
  })
}

figma.on('run', onRun)
