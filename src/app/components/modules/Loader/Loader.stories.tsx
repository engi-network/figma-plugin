import { select } from '@storybook/addon-knobs'

import { STEPS } from '~/app/pages/Main/Main.types'

import Loader from './Loader'

export default { component: Loader, title: 'Modules/Loader' }

export function LoaderWithAnimationWithKnobs() {
  const step = select(
    'Step',
    [
      STEPS.INIT,
      STEPS.DOWNLOAD_FIGMA_CHECK_FRAME,
      STEPS.CAPTURED_SCREENSHOTS,
      STEPS.CHECKED_OUT_CODE,
      STEPS.INSTATALLED_PACKAGES,
      STEPS.CAPTURED_SCREENSHOTS,
      STEPS.VISUAL_COMPARE,
      STEPS.NUMERIC_COMPARE,
      STEPS.UPLOADED_SCREENSHOTS,
    ],
    STEPS.INIT,
  )
  return (
    <div className="w-64 h-64">
      <Loader step={step} />
    </div>
  )
}
