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
  return (
    <StoryContainer>
      <ImageCarousel imageUrls={imageUrls} />
    </StoryContainer>
  )
}
