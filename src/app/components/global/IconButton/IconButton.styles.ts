import { BUTTON_STYLE, StylesMap } from '~/app/lib/constants'

const styles: StylesMap = {
  root: {
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
