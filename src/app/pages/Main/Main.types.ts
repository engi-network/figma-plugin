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
  [STEPS.INIT]: 'Job starts',
  [STEPS.DOWNLOAD_FIGMA_CHECK_FRAME]: 'downloaded Figma check frame',
  [STEPS.CHECKED_OUT_CODE]: 'checked out code',
  [STEPS.INSTATALLED_PACKAGES]: 'installed packages',
  [STEPS.CAPTURED_SCREENSHOTS]: 'captured screenshots',
  [STEPS.VISUAL_COMPARE]: 'completed visual comparisons',
  [STEPS.NUMERIC_COMPARE]: 'completed numeric comparisons',
  [STEPS.UPLOADED_SCREENSHOTS]: 'uploaded screenshots',
}
