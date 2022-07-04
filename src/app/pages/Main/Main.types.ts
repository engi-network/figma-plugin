/* eslint-disable typescript-sort-keys/string-enum */
export enum STEPS {
  INIT = 0,
  FILE = 1,
  DOWNLOAD_FIGMA_CHECK_FRAME = 2,
  CHECKED_OUT_CODE = 3,
  INSTALLED_PACKAGES = 4,
  CAPTURED_SCREENSHOTS = 5,
  VISUAL_COMPARE = 6,
  NUMERIC_COMPARE = 7,
  UPLOADED_SCREENSHOTS = 8,
}

export const STEP_MESSAGES: Record<STEPS, string> = {
  [STEPS.INIT]: 'Uploading Designs',
  [STEPS.FILE]: 'Cloning Repository',
  [STEPS.DOWNLOAD_FIGMA_CHECK_FRAME]: 'Cloning Repository',
  [STEPS.CHECKED_OUT_CODE]: 'Cloning Repository',
  [STEPS.INSTALLED_PACKAGES]:
    'Installing dependencies and building the project',
  [STEPS.CAPTURED_SCREENSHOTS]: 'Rendering Storybook',
  [STEPS.VISUAL_COMPARE]: 'Capturing screenshots',
  [STEPS.NUMERIC_COMPARE]: 'Analyzing similarities',
  [STEPS.UPLOADED_SCREENSHOTS]: 'Analyzing similarities',
}

export const STEP_MAP_TO_STEPPER = {
  [STEPS.INIT]: 0,
  [STEPS.FILE]: 1,
  [STEPS.DOWNLOAD_FIGMA_CHECK_FRAME]: 1,
  [STEPS.CHECKED_OUT_CODE]: 1,
  [STEPS.INSTALLED_PACKAGES]: 2,
  [STEPS.CAPTURED_SCREENSHOTS]: 3,
  [STEPS.VISUAL_COMPARE]: 4,
  [STEPS.NUMERIC_COMPARE]: 5,
  [STEPS.UPLOADED_SCREENSHOTS]: 5,
}
