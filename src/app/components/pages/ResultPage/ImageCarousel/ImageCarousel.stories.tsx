import { useState } from 'react'

import Button from '~/app/components/global/Button/Button'
import Header from '~/app/components/global/Header/Header'
import Modal from '~/app/components/global/Modal/Modal'
import { SelectOption } from '~/app/components/global/Select/Select'
import StoryContainer from '~/app/components/modules/Storybook/StoryContainer/StoryContainer'

import ImageCarousel from './ImageCarousel'

export default {
  component: ImageCarousel,
  title: 'Pages/Result/ImageCarousel',
}

const imageSelectionOptions: Array<SelectOption> = [
  {
    value:
      'https://s3.us-west-2.amazonaws.com/same-story-api-staging/checks/4b8bc01a-e8ec-4cec-b343-803c08fb5323/report/__screenshots__/Global/Components/Button/Button%20With%20Knobs.png',
    name: 'Storycap captured',
  },
  {
    value:
      'https://s3.us-west-2.amazonaws.com/same-story-api-staging/checks/4b8bc01a-e8ec-4cec-b343-803c08fb5323/report/blue_difference.png',
    name: 'Gray-scale Difference',
  },
  {
    value:
      'https://s3.us-west-2.amazonaws.com/same-story-api-staging/checks/4b8bc01a-e8ec-4cec-b343-803c08fb5323/report/gray_difference.png',
    name: 'Blue-scale Difference',
  },
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
      <Modal isOpen={isOpen} onClose={handleClose} isFullScreen>
        <ImageCarousel options={imageSelectionOptions} />
      </Modal>
    </StoryContainer>
  )
}
