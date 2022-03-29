/* eslint-disable typescript-sort-keys/string-enum */
export enum STEPS {
  CLONE = 'clone',
  INSTALL = 'install',
  RENDER = 'render',
  CAPTURE = 'capture',
  COMPARE = 'compare',
}

export const MESSAGES: Record<STEPS, string> = {
  [STEPS.CLONE]: 'Cloning repository…',
  [STEPS.INSTALL]: 'Installing dependencies…',
  [STEPS.RENDER]: 'Rendering Storybook…',
  [STEPS.CAPTURE]: 'Capturing screenshots…',
  [STEPS.COMPARE]: 'Running visual comparison…',
}
