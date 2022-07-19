/* eslint-disable no-console */
/* eslint-disable sort-keys */
/**
 * @TODO might need to connect to sentry later
 */

const logStyles = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  underscore: '\x1b[4m',
  blink: '\x1b[5m',
  reverse: '\x1b[7m',
  hidden: '\x1b[8m',
  fg: {
    black: '\x1b[30m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',
    crimson: '\x1b[38m',
  },
  // Background colors
  bg: {
    black: '\x1b[40m',
    red: '\x1b[41m',
    green: '\x1b[42m',
    yellow: '\x1b[43m',
    blue: '\x1b[44m',
    magenta: '\x1b[45m',
    cyan: '\x1b[46m',
    white: '\x1b[47m',
    crimson: '\x1b[48m',
  },
}

class Logger {
  isDark: boolean

  constructor() {
    this.isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  }

  log(...args) {
    console.log(...args)
  }

  info(...args) {
    if (this.isDark) {
      console.info(`${logStyles.bg.blue}%s${logStyles.bright}`, ...args)
    } else {
      console.info(`${logStyles.bg.cyan}%s${logStyles.reset}`, ...args)
    }
  }

  warn(...args) {
    console.warn(`${logStyles.bg.yellow}%s${logStyles.reset}`, ...args)
  }

  success(...args) {
    console.log(`${logStyles.bg.green}%s${logStyles.reset}`, ...args)
  }

  error(...args) {
    console.error(`${logStyles.bg.red}%s${logStyles.fg.white}`, ...args)
  }
}

export default new Logger()
