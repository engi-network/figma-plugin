import { COLORS, StylesMap } from '~/app/lib/constants'

const styles: StylesMap = {
  tbody: {
    '& ::-webkit-scrollbar': {
      width: 2,
    },
    '& ::-webkit-scrollbar-thumb': {
      background: COLORS.PRIMARY.GREEN,
      width: 2,
    },
    '& ::-webkit-scrollbar-thumb:hover': {
      background: COLORS.WF.PRIMARY,
    },
    '& ::-webkit-scrollbar-track': {
      background: COLORS.DIVIDER.SECONDARY,
      width: 1,
    },
    height: 350,
  },
}

export default styles
