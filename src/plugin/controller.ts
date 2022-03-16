import {
  FIGMA_MSG_TYPE_SAME_STORY_SEND_CLEAR_ERROR_FROM_PLUGIN_TO_UI,
  FIGMA_MSG_TYPE_SAME_STORY_SEND_ERROR_FROM_PLUGIN_TO_UI,
  FIGMA_MSG_TYPE_SAME_STORY_SEND_SELECTION_FROM_PLUGIN_TO_UI,
  repository,
  ShowUIOptions,
} from '~/plugin/constants'

figma.clientStorage.setAsync('ss-repository', repository)
figma.showUI(__html__, ShowUIOptions)

// store selected layer information and message plugin UI
// save a selection to storage + UI
const setSelection = async (selection) => {
  const { name, width, height } = selection
  try {
    const promises = [
      figma.clientStorage.setAsync('ss-name', name),
      figma.clientStorage.setAsync('ss-width', width),
      figma.clientStorage.setAsync('ss-height', height),
      selection.exportAsync(), // bytes must be last promise
    ]
    const results = await Promise.all(promises)
    console.info('extracted selected frame')

    const frame = results.pop()
    figma.ui.postMessage({
      type: FIGMA_MSG_TYPE_SAME_STORY_SEND_SELECTION_FROM_PLUGIN_TO_UI,
      data: {
        frame,
        height,
        name,
        repository,
        width,
      },
    })
  } catch (error) {
    console.error('error extracting selected frame!', error)
  }
}

// set selection if exists
const selection = figma.currentPage.selection[0]

if (selection) {
  setSelection(selection)
} else {
  figma.ui.postMessage({
    type: FIGMA_MSG_TYPE_SAME_STORY_SEND_ERROR_FROM_PLUGIN_TO_UI,
    error: { message: 'Select a frame' },
  })
}

// support ability to change selected frame while plugin is open
figma.on('selectionchange', () => {
  const selection = figma.currentPage.selection[0]

  if (selection) {
    setSelection(selection)
    figma.ui.postMessage({
      type: FIGMA_MSG_TYPE_SAME_STORY_SEND_CLEAR_ERROR_FROM_PLUGIN_TO_UI,
    })
  } else {
    figma.ui.postMessage({
      type: FIGMA_MSG_TYPE_SAME_STORY_SEND_ERROR_FROM_PLUGIN_TO_UI,
      error: { message: 'Select a frame' },
    })
  }
})

figma.ui.onmessage = (msg) => {
  console.info('unhandled message received', msg)
}
