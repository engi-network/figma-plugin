// eslint-disable-next-line @typescript-eslint/no-var-requires
const createDOMPurify = require('dompurify')

const windowObj: Window = window

const DOMPurify = createDOMPurify(windowObj)

/*!
 * We use ReactDOMServer.renderToString for SSR sanitizing before
 * Start from React 17, when calling `ReactDOMServer.renderToString` during SSR, it will throw a wired invalid hooks call error.
 * That issue is gone start from React 18.0.0-alpha-dbe3363cc because of React SSR code is updated again.
 * Since React 18 is still in alpha, we need to use `DOMPurify.sanitize` and jsdom for SSR sanitizing now.
 */
export const sanitizeHTML = (str: string): string => {
  const clean = DOMPurify.sanitize(str)

  const temp = windowObj.document.createElement('div')
  temp.textContent = clean
  return temp.innerHTML
}
