import { text } from '@storybook/addon-knobs'

import TextWithLabel from './TextWithLabel'

export default {
  component: TextWithLabel,
  title: 'Global/Components/TextWithLabel',
}

export function TextWithLabelWithKnobs() {
  return (
    <div className="bg-primary-white">
      <TextWithLabel
        id="text-with-label-id"
        label={text('Label', 'label')}
        placeholder={text('Placehoder', 'Placeholder')}
        text={text('Text', 'Text')}
      />
    </div>
  )
}
