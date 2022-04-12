import {
  BORDER_STYLE,
  BORDERS_RADIUS,
  COLORS,
  StylesMap,
} from '~/app/lib/constants'
import { typography } from '~/app/styles/typography.styles'

const styles: StylesMap = {
  button: [
    typography.tertiaryHeadline,
    {
      border: 0,
      borderRadius: BORDERS_RADIUS.DEFAULT,
      cursor: 'pointer',
      display: 'inlines-block',
    },
  ],
  disabled: {
    pointerEvents: 'none',
    opacity: 0.3,
  },
  large: {
    fontSize: 16,
    padding: '12px 24px',
  },
  medium: {
    fontSize: 14,
    padding: '11px 20px',
  },
  primary: {
    color: COLORS.PRIMARY.WHITE,
    backgroundColor: COLORS.WF.PRIMARY,
  },
  secondary: {
    color: 'black',
    backgroundColor: COLORS.PRIMARY.WHITE,
    border: BORDER_STYLE.SOLID_BLACK_1PX,
  },
  small: {
    fontSize: 12,
    padding: '10px 16px',
  },
}

export default styles
