import 'swiper/css'
import 'swiper/css/effect-coverflow'

import { EffectCoverflow, Zoom } from 'swiper'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'

import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from '~/app/components/global/Icons'

import styles from './ImageCarousel.styles'

interface Props {
  imageUrls: Array<string>
}

function NextButton() {
  const swiper = useSwiper()

  const handleClickNext = () => {
    swiper.slideNext()
  }

  return (
    <div css={[styles.navBtn, styles.nextBtn]} onClick={handleClickNext}>
      <ChevronRightIcon className="w-8 h-8" />
    </div>
  )
}

function PrevButton() {
  const swiper = useSwiper()
  const handleClickPrev = () => {
    swiper.slidePrev()
  }

  return (
    <div css={[styles.navBtn, styles.prevBtn]} onClick={handleClickPrev}>
      <ChevronLeftIcon className="w-8 h-8" />
    </div>
  )
}

function ImageCarousel({ imageUrls }: Props) {
  return (
    <Swiper
      effect={'coverflow'}
      spaceBetween={30}
      slidesPerView={3}
      centeredSlides
      grabCursor
      observer
      observeParents
      parallax
      modules={[Zoom, EffectCoverflow]}
      navigation={{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }}
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
        scale: 0.7,
        stretch: 0,
      }}
    >
      <NextButton />
      <PrevButton />
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
