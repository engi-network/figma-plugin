import { SVGProps } from 'react'

function SvgFullScreenIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M20 3h2v6h-2V5h-4V3h4ZM4 3h4v2H4v4H2V3h2Zm16 16v-4h2v6h-6v-2h4ZM4 19h4v2H2v-6h2v4Z"
        fill="#D7D7D7"
      />
    </svg>
  )
}

export default SvgFullScreenIcon
