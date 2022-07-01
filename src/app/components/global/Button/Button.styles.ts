import { COLORS, StylesMap } from '~/app/lib/constants'
import { typography } from '~/app/styles/typography.styles'

const styles: StylesMap = {
  button: [
    typography.tertiaryHeadline,
    {
      cursor: 'pointer',
      display: 'inline-block',
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
    color: COLORS.PRIMARY.DARK,
    backgroundColor: COLORS.PRIMARY.WHITE,
  },
  small: {
    fontSize: 12,
    padding: '10px 16px',
  },
}

export default styles
