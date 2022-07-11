import { useState } from 'react'

import Button from '~/app/components/global/Button/Button'
import StoryContainer from '~/app/components/modules/Storybook/StoryContainer/StoryContainer'
import { mockSuccessReport } from '~/app/pages/History/History.data'

import DetailModal from './DetailModal'

export default {
  component: DetailModal,
  title: 'Pages/Result/DetailModal',
}

export function DetailModalStory() {
  const [isOpen, setOpen] = useState(false)

  const handleClickMe = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <StoryContainer className="flex-col justify-between items-start p-0">
      <Button onClick={handleClickMe}>Click me</Button>
      <DetailModal
        isOpen={isOpen}
        onClose={handleClose}
        data={mockSuccessReport}
        title="Details"
      />
    </StoryContainer>
  )
}
