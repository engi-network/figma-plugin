import Popover from '~/app/components/global/Popover/Popover'

interface Props {
  title: string
}

function Filter({ title }: Props) {
  return (
    <Popover title={title}>
      <div></div>
    </Popover>
  )
}

export default Filter
