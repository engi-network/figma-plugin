import 'swiper/css'
import 'swiper/css/effect-coverflow'

import { useState } from 'react'
import { EffectCoverflow, Swiper as SwiperClass, Zoom } from 'swiper'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'

import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from '~/app/components/global/Icons'
import Select, { SelectOption } from '~/app/components/global/Select/Select'

import styles from './ImageCarousel.styles'

interface Props {
  options: Array<SelectOption>
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

/**
 *
 * @TODO abstract out Carousel later if we have another usage of swiper
 *
 */

function ImageCarousel({ options }: Props) {
  const [selectedImage, setSelectedImage] = useState(options[0].value)
  const [swiperObj, setSwiperObj] = useState<SwiperClass>()

  const handleSelectChange = (value: string) => {
    setSelectedImage(value)
    const foundIndex = options.findIndex((option) => option.value === value)

    swiperObj?.slideTo(foundIndex)
  }

  const handleSwiperChange = (swiper: SwiperClass) => {
    setSelectedImage(options[swiper.activeIndex].value)
  }

  return (
    <div>
      <Swiper
        effect="coverflow"
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
        onSlideChange={handleSwiperChange}
        onSwiper={(swiper) => setSwiperObj(swiper)}
      >
        <NextButton />
        <PrevButton />
        {options.map(({ value }, index) => (
          <SwiperSlide key={index} zoom>
            <div className="flex justify-center items-center">
              <img src={value} alt="image" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <Select
        options={options}
        onChange={handleSelectChange}
        value={selectedImage}
        placeholder="Result Images"
        className="flex justify-center mt-4"
        buttonClassName="text-text-secondary"
      />
    </div>
  )
}

export default ImageCarousel
