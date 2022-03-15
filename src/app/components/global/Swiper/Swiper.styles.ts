import { StylesMap } from '~/app/lib/constants/styles.types'

const styles: StylesMap = {
  root: {
    display: 'flex',
    width: '100%',
    position: 'relative',
  },
  swiper: {
    alignTtems: 'center',
    border: '1px solid lightgray',
    display: 'flex',
    overflowX: 'scroll',
    padding: '1rem',
    scrollSnapType: 'x mandatory',
    WebkitOverflowScrolling: 'touch',
  },
  slide: {
    border: '1px solid gray',
    borderRadius: '3px',
    flexShrink: 0,
    margin: '1rem',
    scrollSnapAlign: 'start',
    scrollSnapStop: 'always',
    width: '80%',
  },
}

export default styles
