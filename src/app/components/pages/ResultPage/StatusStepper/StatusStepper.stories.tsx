import { ComponentMeta, ComponentStory } from '@storybook/react'

import StoryContainer from '~/app/components/modules/Storybook/StoryContainer/StoryContainer'
import { getPlaceholderImageUrl } from '~/app/lib/utils/string'
import { STEP_MAP_TO_STEPPER, STEP_MESSAGES } from '~/app/pages/Main/Main.types'

import StatusStepper from './StatusStepper'

const imageUrl = getPlaceholderImageUrl([120, 120])

export default {
  component: StatusStepper,
  title: 'Pages/Result/StatusStepper',
  argTypes: {
    activeStep: {
      control: 'select',
      options: [0, 1, 2, 3, 4, 5, 6, 7],
    },
  },
} as ComponentMeta<typeof StatusStepper>

const Template: ComponentStory<typeof StatusStepper> = (args) => (
  <StoryContainer>
    <StatusStepper
      {...args}
      activeStep={STEP_MAP_TO_STEPPER[args.activeStep]}
      stepMessage={STEP_MESSAGES[args.activeStep]}
    />
  </StoryContainer>
)

export const StatusStepperStory = Template.bind({})

StatusStepperStory.args = {
  activeStep: 0,
  className: 'w-[140px]',
  data: {
    code_paths: ['button.tsx', 'button.stories.tsx'],
    code_snippets: ['const a = b;', 'const b = c;'],
  },
  layerName: 'layer-2',
  originalImageUrl: imageUrl,
  stepMessage: STEP_MESSAGES[0],
}
