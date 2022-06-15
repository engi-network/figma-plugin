import { ArrowLeftIcon } from '@heroicons/react/solid'
import React, { useState } from 'react'

import Button from '~/app/components/global/Button/Button'
import Header from '~/app/components/global/Header/Header'
import IconButton from '~/app/components/global/IconButton/IconButton'
import Modal from '~/app/components/global/Modal/Modal'
import StoryContainer from '~/app/components/modules/Storybook/StoryContainer/StoryContainer'
import { ui } from '~/app/lib/utils/ui-dictionary'

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
    <StoryContainer className="flex-col justify-between items-start p-0">
      <Header className="w-full" />
      <Button onClick={handleClickMe}>Click me</Button>
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        isFullScreen
        backButton={
          <IconButton
            icon={<ArrowLeftIcon className="w-4 h-4" />}
            onClick={() => {}}
            className="text-text-secondary z-20"
          >
            {ui('header.back')}
          </IconButton>
        }
      >
        <ImageCarousel imageUrls={imageUrls} />
      </Modal>
    </StoryContainer>
  )
}
