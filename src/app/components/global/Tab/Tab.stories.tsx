import Tab from './Tab'

export default {
  component: Tab,
  title: 'Global/Components/Tab',
}

export function TabStory() {
  return (
    <div className="bg-slate-600 h-screen">
      <Tab tabLabels={['test1', 'test2', 'test3']}>
        <div>Panel1</div>
        <div>Panel2</div>
        <div>Panel3</div>
      </Tab>
    </div>
  )
}
