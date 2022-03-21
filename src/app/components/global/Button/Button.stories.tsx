import Button from './Button'

export default {
  component: Button,
  title: 'Global/Button',
}

export function InputWithKnobs() {
  return (
    <div>
      <Button label="test">Click me</Button>
    </div>
  )
}
