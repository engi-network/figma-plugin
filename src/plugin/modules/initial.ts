import {
  initialSelection,
  LOCAL_STORAGE_KEY,
  SAME_STORY_HISTORY_LIST_PLUGIN_TO_UI,
  SAME_STORY_SEND_ERROR_FROM_PLUGIN_TO_UI,
  ShowUIOptions,
} from '~/plugin/constants'

import { onSelection } from './preview'

/**
 * @description run event occur once open the app. every intializing stuff goes here.
 */

figma.showUI(__html__, ShowUIOptions)

const handleInitialize = async () => {
  // send initial selection data to the app
  const selection = figma.currentPage.selection[0]

  if (selection) {
    onSelection(selection)
  } else {
    figma.ui.postMessage({
      type: SAME_STORY_SEND_ERROR_FROM_PLUGIN_TO_UI,
      error: { message: 'Select a frame!' },
    })
  }

  const initialForm =
    (await figma.clientStorage.getAsync(LOCAL_STORAGE_KEY.FORM)) ||
    initialSelection
  // this line might be useless after MVP
  figma.clientStorage.setAsync(LOCAL_STORAGE_KEY.FORM, initialForm)

  //initialize history
  const intialHistory =
    (await figma.clientStorage.getAsync(LOCAL_STORAGE_KEY.HISTORY)) || []

  figma.ui.postMessage({
    type: SAME_STORY_HISTORY_LIST_PLUGIN_TO_UI,
    data: intialHistory,
  })
}

figma.on('run', handleInitialize)
