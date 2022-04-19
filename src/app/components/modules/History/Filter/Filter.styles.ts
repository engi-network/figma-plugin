import { COLORS, StylesMap } from '~/app/lib/constants'

const styles: StylesMap = {
  form: {
    '& > div::after': {
      borderBottom: `1px solid ${COLORS.TEXT.SECONDARY}`,
      bottom: 0,
      content: "' '",
      opacity: 0.3,
      position: 'absolute',
      right: -25,
      width: 'calc(100% + 25px)',
      zIndex: 20,
    },
    '& > div:last-child::after': {
      border: 'none',
    },
    marginBottom: 0,
  },
}

export default styles
