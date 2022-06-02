import { select } from '@storybook/addon-knobs'

import { STEP_MESSAGES, STEPS } from '~/app/pages/Main/Main.types'

import StoryContainer from '../Storybook/StoryContainer/StoryContainer'
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
    <StoryContainer className="flex-col">
      <Loader step={step} />
      <h2 className="text-2xl font-bold text-text-primary text-center mb-10">
        {STEP_MESSAGES[step]}
      </h2>
    </StoryContainer>
  )
}
