import { StylesMap } from '~/app/lib/constants'

const styles: StylesMap = {
  input: {
    '&::-webkit-calendar-picker-indicator': {
      background: 'red',
      cursor: 'pointer',
      left: 16,
      marginTop: 20,
      opacity: 0,
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
