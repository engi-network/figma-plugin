// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import React from 'react'
import { EffectFade, Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

interface Props {
  imageUrls: Array<string>
}

function ImageCarousel({ imageUrls }: Props) {
  return (
    <Swiper
      spaceBetween={30}
      effect={'fade'}
      navigation
      pagination={{
        clickable: true,
      }}
      modules={[EffectFade, Navigation, Pagination]}
      className="mySwiper"
    >
      {imageUrls.map((url, index) => (
        <SwiperSlide key={index}>
          <img src={url} alt="image" />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default ImageCarousel
