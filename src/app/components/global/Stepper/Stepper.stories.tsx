import { ComponentMeta, ComponentStory } from '@storybook/react'

import { mapStepToIcon } from '~/app/components/pages/ResultPage/StatusStepper/StatusStepper'

import Step from './Step/Step'
import Stepper from './Stepper'

export default {
  component: Stepper,
  title: 'Global/Components/Stepper',
  subcomponents: { Step },
  argTypes: {
    orientation: { control: 'select', options: ['horizontal', 'vertical'] },
  },
} as ComponentMeta<typeof Stepper>

const Template: ComponentStory<typeof Stepper> = (args) => (
  <div className="bg-slate-800 h-full p-10">
    <Stepper {...args}>{args.children}</Stepper>
  </div>
)

export const StepperStory = Template.bind({})
StepperStory.args = {
  activeStep: 2,
  orientation: 'horizontal',
  children: (
    <>
      {Array(6)
        .fill(0)
        .map((_, index) => (
          <Step className="p-2" key={index}>
            {mapStepToIcon(20, 20)[index]}
          </Step>
        ))}
    </>
  ),
}
