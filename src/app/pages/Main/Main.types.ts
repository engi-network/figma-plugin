/* eslint-disable typescript-sort-keys/string-enum */
export enum STEPS {
  CLONE = 0,
  INSTALL = 1,
  RENDER = 2,
  CAPTURE = 3,
  COMPARE = 4,
}

export const STEP_MESSAGES: Record<STEPS, string> = {
  [STEPS.CLONE]: 'Cloning repository...',
  [STEPS.INSTALL]: 'Installing dependencies...',
  [STEPS.RENDER]: 'Rendering Storybook...',
  [STEPS.CAPTURE]: 'Capturing screenshots...',
  [STEPS.COMPARE]: 'Running visual comparison...',
}
