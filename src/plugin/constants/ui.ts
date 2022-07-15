import { PluginSelection } from '~/app/models/PluginSelection'

export const ShowUIOptions = {
  title: 'Same Story?',
  width: 728,
  height: 670,
}

export const initialSelection: Partial<PluginSelection> = {
  branch: '',
  commit: '',
  component: '',
  github_token: '',
  height: 0,
  name: '',
  path: '',
  repository: 'engi-network/engi-ui',
  story: '',
  width: 0,
}
