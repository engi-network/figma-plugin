import { COLORS, StylesMap } from '~/app/lib/constants'

const styles: StylesMap = {
  swiper: {
    '.swiper-pagination': {
      '.swiper-pagination-bullet': {
        background: COLORS.PRIMARY.GRAY,
      },
      '.swiper-pagination-bullet.swiper-pagination-bullet-active': {
        background: COLORS.PRIMARY.GREEN,
      },
    },
  },
  navBtn: {
    alignItems: 'center',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    position: 'absolute',
    top: '50%',
    zIndex: 10,
  },
  nextBtn: {
    right: 10,
  },
  prevBtn: {
    left: 10,
  },
}

export default styles
