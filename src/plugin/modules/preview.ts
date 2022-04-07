import { PluginSelection } from '~/app/models/PluginSelection'
import {
  initialSelection,
  LOCAL_STORAGE_KEY,
  SAME_STORY_SEND_CLEAR_ERROR_FROM_PLUGIN_TO_UI,
  SAME_STORY_SEND_ERROR_FROM_PLUGIN_TO_UI,
  SAME_STORY_SEND_SELECTION_FROM_PLUGIN_TO_UI,
} from '~/plugin/constants'

/**
 *
 * @description
 * store selected layer information and message plugin UI
 * save a selection to storage + UI
 */

const onSelection = async (selection: SceneNode) => {
  const { name, width, height } = selection
  try {
    const prevForm = await figma.clientStorage.getAsync(LOCAL_STORAGE_KEY.FORM)

    const [component, story = ''] = name.split('-')
    const newForm = {
      ...initialSelection,
      ...prevForm,
      component,
      height,
      story,
      width,
    }

    await figma.clientStorage.setAsync(LOCAL_STORAGE_KEY.FORM, newForm)
    const frame = await selection.exportAsync()

    figma.ui.postMessage({
      type: SAME_STORY_SEND_SELECTION_FROM_PLUGIN_TO_UI,
      data: {
        ...newForm,
        frame,
      } as PluginSelection,
    })
  } catch (error) {
    figma.ui.postMessage({
      type: SAME_STORY_SEND_ERROR_FROM_PLUGIN_TO_UI,
      error: {
        message: 'Oops, something went wrong with selection',
      },
    })
    console.error('Error extracting selected frame!', error)
  }
}

const selection = figma.currentPage.selection[0]

if (selection) {
  onSelection(selection)
} else {
  figma.ui.postMessage({
    type: SAME_STORY_SEND_ERROR_FROM_PLUGIN_TO_UI,
    error: { message: 'Select a frame!' },
  })
}

figma.on('selectionchange', () => {
  const selection = figma.currentPage.selection[0]

  if (!selection) {
    figma.ui.postMessage({
      type: SAME_STORY_SEND_ERROR_FROM_PLUGIN_TO_UI,
      error: { message: 'Select a frame!' },
    })

    return
  }

  onSelection(selection)
  figma.ui.postMessage({
    type: SAME_STORY_SEND_CLEAR_ERROR_FROM_PLUGIN_TO_UI,
  })
})

/**
 * @TODO implement the cases when memory router change in the app side
 */
