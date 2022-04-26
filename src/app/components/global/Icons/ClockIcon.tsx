import { SVGProps } from 'react'

function SvgClockIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M10 18.833a8.333 8.333 0 1 1 0-16.667 8.333 8.333 0 0 1 0 16.667Zm0-1.667a6.667 6.667 0 1 0 0-13.333 6.667 6.667 0 0 0 0 13.333Zm.833-6.667h3.334v1.667h-5V6.333h1.666v4.166Z"
        fill="#D7D7D7"
      />
    </svg>
  )
}

export default SvgClockIcon
