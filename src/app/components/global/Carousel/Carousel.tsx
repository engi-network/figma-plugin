import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

import { Swiper, SwiperSlide } from 'swiper/react'

function Carousel() {
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={3}
      onSlideChange={() => console.info('slide change')}
      onSwiper={(swiper) => console.info(swiper)}
      className="w-full"
    >
      {Array(50)
        .fill(0)
        .map((_, index) => (
          <SwiperSlide key={index}>
            <div className="border-dotted border-2 border-indigo-600">
              Slide {index}
            </div>
          </SwiperSlide>
        ))}
    </Swiper>
  )
}

export default Carousel
