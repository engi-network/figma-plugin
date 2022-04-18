import { StylesMap } from '~/app/lib/constants'

const styles: StylesMap = {
  input: {
    '&::-webkit-calendar-picker-indicator': {
      cursor: 'pointer',
      left: 16,
      opacity: 0,
      paddingTop: 20,
      position: 'absolute',
      top: 0,
      zIndex: 10,
    },
    '&::-webkit-clear-button': {
      display: 'none',
    },
  },
}

export default styles
