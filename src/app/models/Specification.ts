import { DFormValues } from '../components/modules/DynamicForm/DynamicForm'

export interface Specification {
  args?: DFormValues
  branch?: string
  check_id: string
  commit?: string
  component: string
  github_token?: string
  height: string
  name: string
  path: string
  repository: string
  story: string
  url_check_frame: string
  width: string
}
