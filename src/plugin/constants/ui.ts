import { PluginSelection } from '~/app/models/PluginSelection'

export const ShowUIOptions = {
  title: 'Same story?',
  width: 728,
  height: 620,
}

export const initialSelection: Partial<PluginSelection> = {
  branch: '',
  commit: '',
  component: '',
  height: 0,
  repository: 'engi-network/engi-ui',
  story: '',
  width: 0,
}
