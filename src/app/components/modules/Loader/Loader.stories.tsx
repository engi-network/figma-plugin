import { select } from '@storybook/addon-knobs'

import { STEPS } from '~/app/pages/Main/Main.types'

import Loader from './Loader'

export default { component: Loader, title: 'Modules/Loader' }

export function LoaderWithAnimationWithKnobs() {
  const step = select(
    'Step',
    [STEPS.CAPTURE, STEPS.CLONE, STEPS.COMPARE, STEPS.INSTALL, STEPS.RENDER],
    STEPS.CAPTURE,
  )
  return (
    <div className="w-64 h-64">
      <Loader step={step} />
    </div>
  )
}
