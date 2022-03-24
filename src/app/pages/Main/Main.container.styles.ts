import { COLORS, StylesMap } from '~/app/lib/constants'
import { typography } from '~/app/styles/typography.styles'

const styles: StylesMap = {
  title: [
    typography.primaryHeadline,
    {
      color: COLORS.WF.PRIMARY,
    },
  ],
}

export default styles
