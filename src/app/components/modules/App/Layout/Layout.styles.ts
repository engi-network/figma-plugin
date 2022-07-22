import { COLORS, StylesMap } from '~/app/lib/constants'

const styles: StylesMap = {
  scrollbar: {
    '::-webkit-scrollbar': {
      width: 2,
    },

    /* Track */
    '::-webkit-scrollbar-track': {
      background: COLORS.DIVIDER.SECONDARY,
      width: 1,
    },

    /* Handle */
    '::-webkit-scrollbar-thumb': {
      background: COLORS.PRIMARY.GREEN,
      width: 2,
    },
    /* Handle on hover */
    '::-webkit-scrollbar-thumb:hover': {
      background: COLORS.WF.PRIMARY,
    },
  },
}

export default styles
