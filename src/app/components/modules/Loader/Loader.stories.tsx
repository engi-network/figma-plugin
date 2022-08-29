import { ComponentMeta, ComponentStory } from '@storybook/react'
import { AnimatePresence, motion, useAnimation } from 'framer-motion'
import { useEffect, useState } from 'react'

import {
  STEP_MAP_TO_STEPPER,
  STEP_MESSAGES,
  STEPS,
} from '~/app/pages/Main/Main.types'

import StoryContainer from '../Storybook/StoryContainer/StoryContainer'
import Loader from './Loader'

const transition = {
  duration: 1,
  type: 'spring',
  stiffness: 50,
  damping: 20,
}

export default {
  component: Loader,
  title: 'Modules/Loader',
  argTypes: {
    step: {
      option: 'select',
      options: [
        STEPS.INIT,
        STEPS.DOWNLOAD_FIGMA_CHECK_FRAME,
        STEPS.CAPTURED_SCREENSHOTS,
        STEPS.CHECKED_OUT_CODE,
        STEPS.INSTALLED_PACKAGES,
        STEPS.CAPTURED_SCREENSHOTS,
        STEPS.VISUAL_COMPARE,
        STEPS.NUMERIC_COMPARE,
        STEPS.UPLOADED_SCREENSHOTS,
      ],
    },
  },
} as ComponentMeta<typeof Loader>

const Template: ComponentStory<typeof Loader> = (args) => {
  const { step } = args
  const control = useAnimation()
  const [state, setState] = useState(false)

  useEffect(() => {
    setState((prev) => !prev)
    if (state) {
      control.start('hidden')
    } else {
      control.start('visible')
    }
  }, [step])

  return (
    <StoryContainer className="flex-col relative">
      <AnimatePresence initial={false}>
        <motion.div
          key={STEP_MAP_TO_STEPPER[step]}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={transition}
          className="absolute top-10"
        >
          <Loader step={step} />
        </motion.div>
      </AnimatePresence>
      <AnimatePresence initial={false}>
        <motion.h2
          key={STEP_MAP_TO_STEPPER[step]}
          initial={{ bottom: 0, opacity: 0 }}
          animate={{ bottom: 100, opacity: 1 }}
          exit={{ bottom: 200, opacity: 0 }}
          transition={transition}
          className="text-2xl font-bold text-text-primary text-center mb-10 absolute"
        >
          {STEP_MESSAGES[step]}
        </motion.h2>
      </AnimatePresence>
    </StoryContainer>
  )
}

export const LoaderWithAnimationStory = Template.bind({})
LoaderWithAnimationStory.args = {
  step: STEPS.INIT,
}
