import 'swiper/css'

import { Swiper, SwiperSlide } from 'swiper/react'

function Carousel() {
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={3}
      onSlideChange={() => console.info('slide change')}
      onSwiper={() => console.info('')}
      className="w-full"
      css={{ border: '1px solid gray', padding: '10px' }}
    >
      {Array(50)
        .fill(0)
        .map((_, index) => (
          <SwiperSlide key={index}>
            <div
              css={{ border: '1px solid gray' }}
              className="border-dotted border-2 border-indigo-600"
            >
              Slide {index}
            </div>
          </SwiperSlide>
        ))}
    </Swiper>
  )
}

export default Carousel
