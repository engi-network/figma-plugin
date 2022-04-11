import { COLORS, StylesMap } from '~/app/lib/constants'

const styles: StylesMap = {
  optionPanel: {
    filter: 'drop-shadow(0px 15px 80px rgba(113, 127, 166, 0.15))',
    minWidth: 300,
    '& li:last-child::after': {
      borderBottom: 'none',
    },
  },
  option: {
    '&::after': {
      borderBottom: `1px solid ${COLORS.TEXT.SECONDARY}`,
      bottom: 0,
      content: "' '",
      opacity: 0.3,
      position: 'absolute',
      width: '100%',
      zIndex: 20,
    },
    padding: '18px 24px',
  },
}

export default styles