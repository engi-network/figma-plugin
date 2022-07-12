import { COLORS, StylesMap } from '~/app/lib/constants'

const styles: StylesMap = {
  container: {
    background: 'rgb(35, 35, 35)',
    fontSize: 12,
    padding: '12px 12px 12px 0px',
    width: 300,
  },
  lineNumberContainer: {
    paddingRight: 100,
  },
  lineNumber: {
    backdropFilter: 'blur(4px)',
    background: 'rgb(62, 62, 62)',
    color: COLORS.PRIMARY.WHITE,
    marginRight: 12,
    paddingLeft: 12,
  },
}

export default styles
