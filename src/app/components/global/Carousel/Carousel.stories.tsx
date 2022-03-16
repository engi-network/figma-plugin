import Carousel from './Carousel'

export default {
  component: Carousel,
  title: 'Global/Carousel',
}

export function CarouselWithKnobs() {
  return (
    <div className="bg-gray-500">
      <Carousel />
    </div>
  )
}
