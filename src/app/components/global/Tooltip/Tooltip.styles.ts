import { StylesMap } from '~/app/lib/constants'

const styles: StylesMap = {
  arrow: {
    backdropFilter: 'blur(200px)',
    background: 'rgba(35, 35, 35, 0.4)',
    clipPath: 'polygon(0% 100%, 50% 0%, 100% 100%)',
    height: 8,
    position: 'absolute',
    transform: 'rotate(270deg)',
    width: 8,
  },
  arrow_bottom: {
    transform: 'rotate(180deg)',
  },
  arrow_right: {
    transform: 'rotate(90deg)',
  },
  arrow_top: {
    transform: 'rotate(0deg)',
  },
  popper: {
    padding: 5,
    background: 'rgba(35, 35, 35, 0.4)',
    backdropFilter: 'blur(200px)',
  },
}

export default styles
