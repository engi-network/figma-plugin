import { StylesMap } from '../../../lib/constants/styles.types'

const styles: StylesMap = {
  button: {
    border: 0,
    borderRadius: '3em',
    cursor: 'pointer',
    display: 'inlines-block',
    fontWeight: 700,
    lineHeight: 1,
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
    color: 'white',
    backgroundColor: '#1ea7fd',
  },
  secondary: {
    color: '#333',
    backgroundColor: 'transparent',
    boxShadow: 'rgba(0, 0, 0, 0.15) 0px 0px 0px 1px inset',
  },
  small: {
    fontSize: 12,
    padding: '10px 16px',
  },
}

export default styles
