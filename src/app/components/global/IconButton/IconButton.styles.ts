import { BUTTON_STYLE, COLORS, StylesMap } from '~/app/lib/constants'

const styles: StylesMap = {
  root: {
    '& > svg': {
      color: COLORS.WF.PRIMARY,
    },
    alignItems: 'center',
    cursor: 'pointer',
    display: 'flex',
    height: 30,
    justifyContent: 'center',
  },
  text: {
    marginLeft: 10,
  },
  [BUTTON_STYLE.SOLID]: {},
  [BUTTON_STYLE.OUTLINED]: {},
}

export default styles
