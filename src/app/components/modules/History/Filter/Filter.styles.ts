import { COLORS, StylesMap } from '~/app/lib/constants'

const styles: StylesMap = {
  togglePanel: {
    '&::after': {
      borderBottom: `1px solid ${COLORS.TEXT.SECONDARY}`,
      bottom: 0,
      content: "' '",
      opacity: 0.3,
      position: 'absolute',
      width: '100%',
      zIndex: 20,
    },
    paddingBottom: 20,
    paddingTop: 20,
  },
}

export default styles
