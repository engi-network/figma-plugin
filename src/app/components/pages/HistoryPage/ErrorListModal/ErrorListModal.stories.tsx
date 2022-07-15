import React, { useState } from 'react'

import Button from '~/app/components/global/Button/Button'
import StoryContainer from '~/app/components/modules/Storybook/StoryContainer/StoryContainer'
import { mockFailReport } from '~/app/pages/History/History.data'

import ErrorListModal from './ErrorListModal'

export default {
  component: ErrorListModal,
  title: 'Pages/Result/ErrorListModal',
}

export function ErrorListModalStory() {
  const [isOpen, setOpen] = useState(false)

  const handleClickMe = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const failedHistory = Array(100).fill(mockFailReport)

  return (
    <StoryContainer className="flex-col justify-between items-start p-0">
      <Button onClick={handleClickMe}>Click me</Button>
      <ErrorListModal
        isOpen={isOpen}
        onClose={handleClose}
        data={failedHistory}
        title="Errors"
      />
    </StoryContainer>
  )
}
