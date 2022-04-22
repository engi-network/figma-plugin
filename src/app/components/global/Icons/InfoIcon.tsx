import { SVGProps } from 'react'

function SvgInfoIcon(props: SVGProps<SVGSVGElement>) {
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
        opacity={0.4}
        d="M18.333 10.5A8.333 8.333 0 0 1 10 18.832a8.334 8.334 0 1 1 8.333-8.333Z"
        fill="#65FEB7"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.725 11.026a.73.73 0 0 1-.73.729.73.73 0 0 1-.728-.73V7.343a.73.73 0 0 1 .729-.729.73.73 0 0 1 .729.73v3.683ZM9.271 13.67a.732.732 0 0 1 1.462 0 .732.732 0 0 1-1.462 0Z"
        fill="#65FEB7"
      />
    </svg>
  )
}

export default SvgInfoIcon
