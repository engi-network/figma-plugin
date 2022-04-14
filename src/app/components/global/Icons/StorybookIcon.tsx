import * as React from 'react'
import { SVGProps } from 'react'

const SvgStorybookIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 48 48"
    fill="none"
    {...props}
  >
    <g filter="url(#storybook-icon_svg__a)">
      <path
        d="M0 24C0 10.745 10.745 0 24 0s24 10.745 24 24-10.745 24-24 24S0 37.255 0 24Z"
        fill="#000"
        fillOpacity={0.4}
      />
      <path
        d="m16.259 35.348-1.078-22.09h-.808l.808 22.09h1.078Z"
        fill="#B57EE5"
      />
      <path
        d="m16.708 35.347-1.078-22.09L33.23 12v24.155l-16.522-.808Z"
        fill="#F1618C"
      />
      <path
        d="m28.74 15.233.225-3.008 2.11-.18v3.188l-1.06-.96-1.274.96ZM25.924 21.453l3.47-.086c.086-3.362-1.66-5.021-4.698-5.021-3.039 0-4.741 1.724-4.741 4.31 0 4.504 5.819 4.59 5.819 7.047 0 .69-.324 1.1-1.035 1.1-.927 0-1.293-.604-1.25-2.285h-3.642c-.28 4.16 2.155 5.107 4.935 5.107 2.694 0 4.806-1.25 4.806-3.965 0-4.827-5.905-4.698-5.905-7.09 0-.97.69-1.1 1.1-1.1.43 0 1.206.173 1.141 1.983Z"
        fill="#fff"
      />
    </g>
    <defs>
      <filter
        id="storybook-icon_svg__a"
        x={-4}
        y={-4}
        width={56}
        height={56}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feGaussianBlur in="BackgroundImage" stdDeviation={2} />
        <feComposite
          in2="SourceAlpha"
          operator="in"
          result="effect1_backgroundBlur_593_25697"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_backgroundBlur_593_25697"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
)

export default SvgStorybookIcon
