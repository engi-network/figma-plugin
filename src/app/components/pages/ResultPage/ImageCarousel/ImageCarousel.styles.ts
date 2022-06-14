import { COLORS, StylesMap } from '~/app/lib/constants'

const styles: StylesMap = {
  swiper: {
    '.swiper-button-next, .swiper-button-prev': {
      '::after': {
        display: 'none',
      },
    },
    '.swiper-pagination': {
      '.swiper-pagination-bullet': {
        background: COLORS.PRIMARY.GRAY,
      },
      '.swiper-pagination-bullet.swiper-pagination-bullet-active': {
        background: COLORS.PRIMARY.GREEN,
      },
    },
    // '.swiper-slide': {
    //   backgroundPosition: 'center',
    //   backgroundSize: 'cover',
    //   width: 300,
    //   height: 300,
    // },
    // '.swiperSlide img': {
    //   display: 'block',
    //   width: '100%',
    // },
  },
}

export default styles
