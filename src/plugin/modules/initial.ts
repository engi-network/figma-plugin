import {
  initialSelection,
  LOCAL_STORAGE_KEY,
  SAME_STORY_APP_CLOSE,
  SAME_STORY_HISTORY_LIST_PLUGIN_TO_UI,
  ShowUIOptions,
} from '~/plugin/constants'

/**
 * @description run event occur once open the app. every intializing stuff goes here.
 */

figma.showUI(__html__, ShowUIOptions)

const handleInitialization = async () => {
  const initialForm =
    (await figma.clientStorage.getAsync(LOCAL_STORAGE_KEY.FORM)) ||
    initialSelection
  // this line might be useless after MVP
  figma.clientStorage.setAsync(LOCAL_STORAGE_KEY.FORM, initialForm)

  //initialize history
  const initialHistory =
    (await figma.clientStorage.getAsync(LOCAL_STORAGE_KEY.HISTORY)) || []

  figma.ui.postMessage({
    type: SAME_STORY_HISTORY_LIST_PLUGIN_TO_UI,
    data: initialHistory,
  })
}

const handleClose = async () => {
  figma.ui.postMessage({
    type: SAME_STORY_APP_CLOSE,
  })
}

figma.on('run', handleInitialization)
figma.on('close', handleClose)
