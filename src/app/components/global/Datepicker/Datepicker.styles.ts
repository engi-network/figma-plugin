import { COLORS, StylesMap } from '~/app/lib/constants'

const styles: StylesMap = {
  input: {
    '&::-webkit-calendar-picker-indicator': {
      color: COLORS.PRIMARY.WHITE,
      cursor: 'pointer',
      left: 0,
      marginTop: 5,
      position: 'absolute',
      top: 0,
      zIndex: 1,
    },
    '&::-webkit-clear-button': {
      display: 'none',
    },
    '&::-webkit-datetime-edit-fields-wrapper': {
      paddingLeft: 25,
    },
  },
}

export default styles
