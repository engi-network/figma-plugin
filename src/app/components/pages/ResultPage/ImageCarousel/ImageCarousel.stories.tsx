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
  'https://swiperjs.com/demos/images/nature-1.jpg',
  'https://swiperjs.com/demos/images/nature-2.jpg',
  'https://swiperjs.com/demos/images/nature-3.jpg',
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
