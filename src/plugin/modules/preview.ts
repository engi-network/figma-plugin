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

export const onSelection = async (selection: SceneNode): Promise<void> => {
  const { width, height, name } = selection
  try {
    const prevForm = await figma.clientStorage.getAsync(LOCAL_STORAGE_KEY.FORM)

    const newForm = {
      ...prevForm,
      component: '',
      height,
      name,
      repository: prevForm.repository
        ? prevForm.repository
        : initialSelection.repository, // need to be considered
      story: '',
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
    console.warn('Error extracting selected frame!', error)
  }
}

figma.on('selectionchange', () => {
  const selection = figma.currentPage.selection[0]

  if (!selection) {
    figma.ui.postMessage({
      type: SAME_STORY_SEND_ERROR_FROM_PLUGIN_TO_UI,
      error: { message: 'Please select a frame!' },
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
