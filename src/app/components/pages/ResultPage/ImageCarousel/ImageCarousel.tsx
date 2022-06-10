import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline'
import { EffectFade, Navigation, Pagination, Zoom } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import styles from './ImageCarousel.styles'

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
      navigation={{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }}
      pagination={{
        clickable: true,
      }}
      modules={[Zoom, EffectFade, Navigation, Pagination]}
      zoom
      css={styles.swiper}
      className="image-carousel-container"
      keyboard={{
        enabled: true,
        onlyInViewport: false,
      }}
    >
      <div className="swiper-button-next">
        <ChevronRightIcon className="w-8 h-8 text-primary-green" />
      </div>
      <div className="swiper-button-prev">
        <ChevronLeftIcon className="w-8 h-8 text-primary-green" />
      </div>
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
