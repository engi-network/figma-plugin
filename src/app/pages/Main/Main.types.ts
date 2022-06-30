/* eslint-disable typescript-sort-keys/string-enum */
export enum STEPS {
  INIT = 0,
  DOWNLOAD_FIGMA_CHECK_FRAME = 1,
  CHECKED_OUT_CODE = 2,
  INSTALLED_PACKAGES = 3,
  CAPTURED_SCREENSHOTS = 4,
  VISUAL_COMPARE = 5,
  NUMERIC_COMPARE = 6,
  UPLOADED_SCREENSHOTS = 7,
}

export const STEP_MESSAGES: Record<STEPS, string> = {
  [STEPS.INIT]: 'Cloning Repository',
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
  [STEPS.DOWNLOAD_FIGMA_CHECK_FRAME]: 0,
  [STEPS.CHECKED_OUT_CODE]: 0,
  [STEPS.INSTALLED_PACKAGES]: 1,
  [STEPS.CAPTURED_SCREENSHOTS]: 2,
  [STEPS.VISUAL_COMPARE]: 3,
  [STEPS.NUMERIC_COMPARE]: 4,
  [STEPS.UPLOADED_SCREENSHOTS]: 4,
}
