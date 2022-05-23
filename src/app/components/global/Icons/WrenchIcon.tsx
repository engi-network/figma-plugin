import { SVGProps } from 'react'

function SvgWrenchIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 17 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M13.486 7.578 13.26 9.72a.737.737 0 0 1-.288.512l-2.05 1.556a.785.785 0 0 1-.59.147l-2.814-.413s-2.129 1.588-3.393 2.534a8.193 8.193 0 0 1-2.707-3.241c1.275-.945 3.458-2.57 3.458-2.57l.28-2.779c.022-.21.13-.4.3-.524l2.112-1.546a.792.792 0 0 1 .596-.136l2.224.366c.184.03.338.165.391.343a.428.428 0 0 1-.15.469l-2.337 1.73a.461.461 0 0 0-.07.663l.682.857.188.236.678.854c.167.21.47.255.676.1l2.31-1.732a.45.45 0 0 1 .499-.02c.16.095.252.273.232.452Z"
        fill="url(#wrench-icon_svg__a)"
      />
      <circle
        r={7.625}
        transform="matrix(1 0 .01658 .99986 8.133 7.999)"
        stroke="url(#wrench-icon_svg__b)"
        strokeWidth={0.75}
      />
      <defs>
        <linearGradient
          id="wrench-icon_svg__a"
          x1={11.052}
          y1={4.365}
          x2={-5.483}
          y2={15.865}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F17A55" />
          <stop offset={1} stopColor="#65FEB7" />
        </linearGradient>
        <linearGradient
          id="wrench-icon_svg__b"
          x1={13.459}
          y1={2.5}
          x2={2.091}
          y2={13.307}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#EE7E58" />
          <stop offset={1} stopColor="#A2C68D" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default SvgWrenchIcon
