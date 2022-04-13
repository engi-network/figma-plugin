import { PluginSelection } from '~/app/models/PluginSelection'

export const ShowUIOptions = {
  title: 'Same story?',
  width: 728,
  height: 670,
}

export const initialSelection: Partial<PluginSelection> = {
  branch: '',
  commit: '',
  component: '',
  height: 0,
  path: '',
  repository: 'engi-network/engi-ui',
  story: '',
  width: 0,
}
