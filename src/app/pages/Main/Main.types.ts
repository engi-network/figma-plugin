/* eslint-disable typescript-sort-keys/string-enum */
export enum STEPS {
  INIT = 0,
  CLONE = 1,
  INSTALL = 2,
  RENDER = 3,
  CAPTURE = 4,
  COMPARE = 5,
}

export const MESSAGES: Record<STEPS, string> = {
  [STEPS.INIT]: 'Initializing...',
  [STEPS.CLONE]: 'Cloning repository...',
  [STEPS.INSTALL]: 'Installing dependencies...',
  [STEPS.RENDER]: 'Rendering Storybook...',
  [STEPS.CAPTURE]: 'Capturing screenshots...',
  [STEPS.COMPARE]: 'Running visual comparison...',
}
