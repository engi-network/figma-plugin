import Button from './Button'

export default {
  component: Button,
  title: 'Global/Button',
}

export function InputWithKnobs() {
  return (
    <div className="bg-red-500">
      <Button label="test" />
    </div>
  )
}
