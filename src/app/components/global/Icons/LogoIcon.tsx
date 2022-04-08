import * as React from 'react'
import { SVGProps } from 'react'

const SvgLogoIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 32 32"
    fill="none"
    {...props}
  >
    <rect width={32} height={32} rx={5} fill="#40444E" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16.64 22.872a6.878 6.878 0 0 0 6.313-4.096h2.486c-1.161 3.707-4.661 6.4-8.798 6.4-4.137 0-7.637-2.693-8.798-6.4h2.486a6.878 6.878 0 0 0 6.312 4.096Zm0-13.568a6.878 6.878 0 0 0-6.312 4.096H7.844C9.004 9.693 12.503 7 16.641 7c4.137 0 7.637 2.693 8.798 6.4h.001c.351 1.202.408 2.132.408 2.56 0 .682-.057 1.153-.057 1.153H4l1.816-2.243h17.588s-.15-.83-.45-1.47a6.878 6.878 0 0 0-6.313-4.096Z"
      fill="#fff"
    />
  </svg>
)

export default SvgLogoIcon
