import { AnalyzeFormValues } from '~/app/components/modules/Code/Code.data'
import { initialSelection, LOCAL_STORAGE_KEY } from '~/plugin/constants'

export const onFormChange = async (data: AnalyzeFormValues) => {
  const prevForm =
    (await figma.clientStorage.getAsync(LOCAL_STORAGE_KEY.FORM)) ||
    initialSelection
  const updatedForm = { ...prevForm, ...data }

  await figma.clientStorage.setAsync(LOCAL_STORAGE_KEY.FORM, updatedForm)
}
