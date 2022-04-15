import TogglePanel from './TogglePanel'

export default {
  component: TogglePanel,
  title: 'Global/Components/TogglePanel',
}

export function TogglePanelWithKnobs() {
  return (
    <div className="h-64 bg-slate-700">
      <TogglePanel title={'Click me'} className="w-32">
        <div>Toggle panel body</div>
      </TogglePanel>
    </div>
  )
}
