import { useState } from 'react'

import Button from '~/app/components/global/Button/Button'
import Modal from '~/app/components/global/Modal/Modal'
import StoryContainer from '~/app/components/modules/Storybook/StoryContainer/StoryContainer'

import ImageCarousel from './ImageCarousel'

export default {
  component: ImageCarousel,
  title: 'Pages/Result/ImageCarousel',
}

const imageUrls = [
  'https://s3.us-west-2.amazonaws.com/same-story-api-staging/checks/4b8bc01a-e8ec-4cec-b343-803c08fb5323/report/__screenshots__/Global/Components/Button/Button%20With%20Knobs.png',
  'https://s3.us-west-2.amazonaws.com/same-story-api-staging/checks/4b8bc01a-e8ec-4cec-b343-803c08fb5323/report/blue_difference.png',
  'https://s3.us-west-2.amazonaws.com/same-story-api-staging/checks/4b8bc01a-e8ec-4cec-b343-803c08fb5323/report/gray_difference.png',
]

export function ImageCarouselStory() {
  const [isOpen, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }

  const handleClickMe = () => {
    setOpen(true)
  }

  return (
    <StoryContainer>
      <Button onClick={handleClickMe}>Click me</Button>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <ImageCarousel imageUrls={imageUrls} />
      </Modal>
    </StoryContainer>
  )
}
