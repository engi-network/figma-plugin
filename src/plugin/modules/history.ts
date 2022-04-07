import { Report } from '~/app/models/Report'
import {
  LOCAL_STORAGE_KEY,
  SAME_STORY_HISTORY_LIST_PLUGIN_TO_UI,
} from '~/plugin/constants'

export const onHistoryCreate = async (data: Report) => {
  let history = await figma.clientStorage.getAsync(LOCAL_STORAGE_KEY.HISTORY)

  if (!Array.isArray(history)) {
    history = []
  }

  history.push(data)
  await figma.clientStorage.setAsync(LOCAL_STORAGE_KEY.HISTORY, history)
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
