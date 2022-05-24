/* eslint-disable typescript-sort-keys/string-enum */
export enum STEPS {
  INIT = 0,
  DOWNLOAD_FIGMA_CHECK_FRAME = 1,
  CHECKED_OUT_CODE = 2,
  INSTATALLED_PACKAGES = 3,
  CAPTURED_SCREENSHOTS = 4,
  VISUAL_COMPARE = 5,
  NUMERIC_COMPARE = 6,
  UPLOADED_SCREENSHOTS = 7,
}

export const STEP_MESSAGES: Record<STEPS, string> = {
  [STEPS.INIT]: 'Cloning Repository',
  [STEPS.DOWNLOAD_FIGMA_CHECK_FRAME]: 'Cloning Repository',
  [STEPS.CHECKED_OUT_CODE]: 'Cloning Repository',
  [STEPS.INSTATALLED_PACKAGES]:
    'Installing dependencies and buiding the project',
  [STEPS.CAPTURED_SCREENSHOTS]: 'Rendering Storybook',
  [STEPS.VISUAL_COMPARE]: 'Capturing screenshots',
  [STEPS.NUMERIC_COMPARE]: 'Analyizing similarities',
  [STEPS.UPLOADED_SCREENSHOTS]: 'Analyizing similarities',
}
