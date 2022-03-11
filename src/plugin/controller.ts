import { FIGMA_SELECTION_CHANGE, ShowUIOptions } from '~/plugin/constants'

figma.showUI(__html__, ShowUIOptions)

// store selected layer information and message plugin UI
figma.on('selectionchange', async () => {
  console.info('engi | selection changed in figma')

  // get current selection
  const { name, width, height, ...selection } = figma.currentPage.selection[0]

  // store locally and export selected layer as bytes
  const [layer] = await Promise.all([
    selection.exportAsync(), // https://www.figma.com/plugin-docs/api/properties/nodes-exportasync/#docsNav
    figma.clientStorage.setAsync('engi-selected-frame-name', name),
    figma.clientStorage.setAsync('engi-selected-frame-width', name),
    figma.clientStorage.setAsync('engi-selected-frame-height', name),
  ])

  figma.ui.postMessage({
    type: FIGMA_SELECTION_CHANGE,
    data: {
      name,
      width,
      height,
      layer,
    },
  })
})
