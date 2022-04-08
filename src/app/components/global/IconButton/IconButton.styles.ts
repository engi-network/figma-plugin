import { BUTTON_STYLE, DIRECTION, StylesMap } from '~/app/lib/constants'

const styles: StylesMap = {
  root: {
    alignItems: 'center',
    cursor: 'pointer',
    display: 'flex',
    height: 30,
    justifyContent: 'center',
  },
  [BUTTON_STYLE.SOLID]: {},
  [BUTTON_STYLE.OUTLINED]: {},
  [DIRECTION.LEFT]: {
    marginLeft: 10,
  },
  [DIRECTION.RIGHT]: {
    marginRight: 10,
  },
}

export default styles
