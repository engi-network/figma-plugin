import { Report } from '~/app/models/Report'
import { LOCAL_STORAGE_KEY } from '~/plugin/constants'

export const onCreateHistory = async (data: Report) => {
  let history = await figma.clientStorage.getAsync(LOCAL_STORAGE_KEY.HISTORY)

  if (!Array.isArray(history)) {
    history = []
  }

  history.push(data)
  await figma.clientStorage.setAsync(LOCAL_STORAGE_KEY.HISTORY, history)
}

export const onClearHistory = async () => {
  await figma.clientStorage.setAsync(LOCAL_STORAGE_KEY.HISTORY, [])
}
