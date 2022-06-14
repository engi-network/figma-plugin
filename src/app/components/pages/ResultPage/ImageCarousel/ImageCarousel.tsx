import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline'
import { EffectCoverflow, Navigation, Pagination, Zoom } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import styles from './ImageCarousel.styles'

interface Props {
  imageUrls: Array<string>
}

function ImageCarousel({ imageUrls }: Props) {
  return (
    <Swiper
      effect={'coverflow'}
      spaceBetween={30}
      slidesPerView={3}
      centeredSlides
      grabCursor
      navigation={{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }}
      pagination={{
        clickable: true,
      }}
      modules={[Zoom, EffectCoverflow, Navigation, Pagination]}
      zoom
      css={styles.swiper}
      className="image-carousel-container"
      keyboard={{
        enabled: true,
        onlyInViewport: false,
      }}
      coverflowEffect={{
        depth: 200,
        modifier: 1,
        rotate: 0,
        scale: 0.9,
        stretch: 0,
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
