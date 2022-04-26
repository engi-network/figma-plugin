export enum FORM_FIELD {
  BRANCH = 'branch',
  COMMIT = 'commit',
  COMPONENT = 'component',
  GH_TOKEN = 'githubToken',
  PATH = 'path',
  REPOSITORY = 'repository',
  STORY = 'story',
}

export interface AnalyzeFormValues {
  [FORM_FIELD.STORY]: string
  [FORM_FIELD.COMPONENT]: string
  [FORM_FIELD.REPOSITORY]: string
  [FORM_FIELD.BRANCH]: string
  [FORM_FIELD.COMMIT]: string
  [FORM_FIELD.PATH]: string
  [FORM_FIELD.GH_TOKEN]: string
}

export const initialFormValue = {
  [FORM_FIELD.COMPONENT]: '',
  [FORM_FIELD.REPOSITORY]: '',
  [FORM_FIELD.STORY]: '',
  [FORM_FIELD.BRANCH]: '',
  [FORM_FIELD.COMMIT]: '',
  [FORM_FIELD.PATH]: '',
  [FORM_FIELD.GH_TOKEN]: '',
}
