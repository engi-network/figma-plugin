import { BUTTON_STYLE, COLORS, StylesMap } from '~/app/lib/constants'

const styles: StylesMap = {
  root: {
    '& > svg': {
      color: COLORS.WF.PRIMARY,
    },
    alignItems: 'center',
    borderRadius: '50%',
    display: 'flex',
    height: 30,
    justifyContent: 'center',
    width: 30,
  },
  [BUTTON_STYLE.SOLID]: {
    background: COLORS.WF.LIGHT,
  },
  [BUTTON_STYLE.OUTLINED]: {
    background: COLORS.PRIMARY.WHITE,
  },
}

export default styles
