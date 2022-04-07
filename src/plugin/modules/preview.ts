import { PluginSelection } from '~/app/models/PluginSelection'
import {
  DEFAULT_REPO,
  FIGMA_MSG_TYPE_SAME_STORY_SEND_CLEAR_ERROR_FROM_PLUGIN_TO_UI,
  FIGMA_MSG_TYPE_SAME_STORY_SEND_ERROR_FROM_PLUGIN_TO_UI,
  FIGMA_MSG_TYPE_SAME_STORY_SEND_SELECTION_FROM_PLUGIN_TO_UI,
  LOCAL_STORAGE_KEY,
  ShowUIOptions,
} from '~/plugin/constants'

let repository = DEFAULT_REPO

;(async () => {
  const repo = await figma.clientStorage.getAsync(LOCAL_STORAGE_KEY.REPOSITORY)
  if (repo) {
    repository = repo
  }
})()

figma.clientStorage.setAsync(LOCAL_STORAGE_KEY.REPOSITORY, repository)
figma.showUI(__html__, ShowUIOptions)

/**
 *
 * @description
 * store selected layer information and message plugin UI
 * save a selection to storage + UI
 */

const onSelection = async (selection: SceneNode) => {
  const { name, width, height } = selection
  try {
    const promises = [
      figma.clientStorage.setAsync(LOCAL_STORAGE_KEY.NAME, name),
      figma.clientStorage.setAsync(LOCAL_STORAGE_KEY.WIDTH, width),
      figma.clientStorage.setAsync(LOCAL_STORAGE_KEY.HEIGHT, height),
      selection.exportAsync(), // bytes must be last promise
    ]
    const results = await Promise.all(promises)
    const frame = results.pop()

    figma.ui.postMessage({
      type: FIGMA_MSG_TYPE_SAME_STORY_SEND_SELECTION_FROM_PLUGIN_TO_UI,
      data: {
        branch: 'master',
        commit: '2f513f8411b438f140ddef716ea92d479bc76f81',
        frame,
        height,
        name,
        repository,
        width,
      } as PluginSelection,
    })
  } catch (error) {
    console.error('Error extracting selected frame!', error)
  }
}

const selection = figma.currentPage.selection[0]

if (selection) {
  onSelection(selection)
} else {
  figma.ui.postMessage({
    type: FIGMA_MSG_TYPE_SAME_STORY_SEND_ERROR_FROM_PLUGIN_TO_UI,
    error: { message: 'Select a frame!' },
  })
}

figma.on('selectionchange', () => {
  const selection = figma.currentPage.selection[0]

  if (!selection) {
    figma.ui.postMessage({
      type: FIGMA_MSG_TYPE_SAME_STORY_SEND_ERROR_FROM_PLUGIN_TO_UI,
      error: { message: 'Select a frame!' },
    })

    return
  }

  onSelection(selection)
  figma.ui.postMessage({
    type: FIGMA_MSG_TYPE_SAME_STORY_SEND_CLEAR_ERROR_FROM_PLUGIN_TO_UI,
  })
})

/**
 * @TODO implement the cases when memory router change in the app side
 */
