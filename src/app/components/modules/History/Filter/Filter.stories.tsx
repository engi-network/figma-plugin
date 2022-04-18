import Filter from './Filter'

export default {
  component: Filter,
  title: 'Global/Modules/Filter',
}

export function FilterWithKnobs() {
  return (
    <div className="h-screen bg-slate-700">
      <Filter title={'Filter by'} />
    </div>
  )
}
