import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import { EffectFade, Navigation, Pagination, Zoom } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

interface Props {
  imageUrls: Array<string>
}

function ImageCarousel({ imageUrls }: Props) {
  return (
    <Swiper
      spaceBetween={30}
      effect="fade"
      slidesPerView={1}
      centeredSlides
      navigation
      pagination={{
        clickable: true,
      }}
      modules={[Zoom, EffectFade, Navigation, Pagination]}
      zoom
    >
      {imageUrls.map((url, index) => (
        <SwiperSlide key={index} zoom>
          <div className="flex justify-center items-center">
            <img src={url} alt="image" />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default ImageCarousel
