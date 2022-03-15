import Swiper from '../Swiper/Swiper'
import SwiperSlide from '../Swiper/SwiperSlide/SwiperSlide'
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

export function SwiperWithCss() {
  return (
    <div>
      <Swiper>
        {Array(50)
          .fill(0)
          .map((_, index) => (
            <SwiperSlide key={index}>css snap shot slide {index}</SwiperSlide>
          ))}
      </Swiper>
    </div>
  )
}
