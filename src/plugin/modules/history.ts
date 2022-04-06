import { Report } from '~/app/models/Report'
import {
  LOCAL_STORAGE_KEY,
  SAME_STORY_HISTORY_LIST_PLUGIN_TO_UI,
} from '~/plugin/constants'

export const onHistoryCreate = async (data: Report) => {
  await figma.clientStorage.setAsync(LOCAL_STORAGE_KEY.HISTORY, data)
}

export const onRun = async () => {
  const data =
    (await figma.clientStorage.getAsync(LOCAL_STORAGE_KEY.HISTORY)) || []

  figma.ui.postMessage({
    type: SAME_STORY_HISTORY_LIST_PLUGIN_TO_UI,
    data,
  })
}

figma.on('run', onRun)
