import UI from '~/app/assets/ui-dictionary/ui.json'

export type UIType = {
  [key: string]: Record<string, unknown> | string | number | boolean
}

export type InterpolationType = {
  [key: string]: string | number | JSX.Element
}

export let UIData: UIType = UI

export function setUIData(data: UIType) {
  UIData = data
}
