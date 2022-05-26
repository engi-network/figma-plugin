import LinkButton from './LinkButton'

export default {
  component: LinkButton,
  title: 'Global/Components/Link',
}

export function LinkButtonStory() {
  return (
    <div className="h-full w-full p-10 bg-slate-500">
      <LinkButton>Click me</LinkButton>
    </div>
  )
}
