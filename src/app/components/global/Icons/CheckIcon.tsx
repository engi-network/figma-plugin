import { SVGProps } from 'react'

function SvgCheckIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx={14} cy={14} r={14} fill="#65FEB7" />
      <path
        d="m12.333 16.643 7.66-7.66 1.18 1.178L12.332 19 7.03 13.697l1.178-1.179 4.125 4.125Z"
        fill="#5C5C41"
      />
    </svg>
  )
}

export default SvgCheckIcon
