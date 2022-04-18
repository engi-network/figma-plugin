import Datepicker from './Datepicker'

export default {
  component: Datepicker,
  title: 'Global/Components/Datepicker',
}

export function DatepickerWithKnobs() {
  return (
    <div className="bg-slate-700 h-56 pt-10 pl-10">
      <Datepicker />
    </div>
  )
}
