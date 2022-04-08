import { SVGProps } from 'react'

function SvgFigmaIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 41 41"
      fill="none"
      {...props}
    >
      <path
        d="M0 20.5C0 9.178 9.178 0 20.5 0S41 9.178 41 20.5 31.822 41 20.5 41 0 31.822 0 20.5Z"
        fill="#030219"
      />
      <g clipPath="url(#figma-icon_svg__a)">
        <path
          d="M16.58 30.408c1.972 0 3.572-1.535 3.572-3.425V23.56h-3.571c-1.972 0-3.572 1.534-3.572 3.424s1.6 3.425 3.572 3.425Z"
          fill="#0ACF83"
        />
        <path
          d="M13.01 19.964c0-1.89 1.6-3.425 3.572-3.425h3.571v6.85h-3.571c-1.972 0-3.572-1.535-3.572-3.425Z"
          fill="#A259FF"
        />
        <path
          d="M13.01 12.942c0-1.89 1.6-3.424 3.572-3.424h3.571v6.849h-3.571c-1.972 0-3.572-1.535-3.572-3.425Z"
          fill="#F24E1E"
        />
        <path
          d="M20.33 9.518h3.572c1.971 0 3.571 1.534 3.571 3.424s-1.6 3.425-3.571 3.425h-3.571v-6.85Z"
          fill="#FF7262"
        />
        <path
          d="M27.473 19.964c0 1.89-1.6 3.424-3.571 3.424s-3.571-1.534-3.571-3.424 1.6-3.425 3.571-3.425 3.571 1.534 3.571 3.425Z"
          fill="#1ABCFE"
        />
      </g>
      <defs>
        <clipPath id="figma-icon_svg__a">
          <path
            fill="#fff"
            transform="translate(13.01 9.518)"
            d="M0 0h14.643v21.232H0z"
          />
        </clipPath>
      </defs>
    </svg>
  )
}

export default SvgFigmaIcon
