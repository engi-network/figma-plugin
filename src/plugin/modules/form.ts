import { SAME_STORY_FORM_UPDATE } from '~/plugin/constants'

export const onFormChange = async (data) => {
  const promises = Object.entries(data).map(async ([key, value]) => {
    await figma.clientStorage.setAsync(key, value)
  })

  await Promise.all(promises)
}

figma.ui.onmessage = (event: MessageEvent) => {
  if (event.type === SAME_STORY_FORM_UPDATE) {
    onFormChange(event.data)
  }
}
