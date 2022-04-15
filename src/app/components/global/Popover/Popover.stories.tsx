import Popover from './Popover'

export default {
  component: Popover,
  title: 'Global/Components/Popover',
}

export function PopoverWithKnobs() {
  return (
    <div className="h-64 bg-slate-700">
      <Popover title={'Filter by'}>
        <div>popover content</div>
      </Popover>
    </div>
  )
}
