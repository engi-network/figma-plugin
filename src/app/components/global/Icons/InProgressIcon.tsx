import { SVGProps } from 'react'

function SvgInProgressIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19 11.314V4.686c0-.379.269-.686.6-.686h5.8c.331 0 .6.307.6.686v6.628c0 .379-.269.686-.6.686h-5.8c-.331 0-.6-.307-.6-.686ZM4 17.686v6.628c0 .379.269.686.6.686h5.8c.331 0 .6-.307.6-.686v-6.628c0-.379-.269-.686-.6-.686H4.6c-.331 0-.6.307-.6.686Zm10 0v6.628c0 .379.46.686 1.029.686h9.942c.569 0 1.029-.307 1.029-.686v-6.628c0-.379-.46-.686-1.029-.686H15.03c-.569 0-1.029.307-1.029.686Zm-10-13v6.628c0 .379.46.686 1.029.686h9.942c.569 0 1.029-.307 1.029-.686V4.686C16 4.307 15.54 4 14.971 4H5.03C4.46 4 4 4.307 4 4.686Z"
        fill="url(#in-progress-icon_svg__a)"
      />
      <defs>
        <radialGradient
          id="in-progress-icon_svg__a"
          cx={0}
          cy={0}
          r={1}
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(18.00002 30.5 -33.96145 20.04284 13 14)"
        >
          <stop offset={0.026} stopColor="#65FEB7" />
          <stop offset={0.218} stopColor="#F27B50" />
          <stop offset={0.469} stopColor="#F27B50" />
          <stop offset={0.699} stopColor="#BA54EC" />
          <stop offset={0.936} stopColor="#65FEB7" />
        </radialGradient>
      </defs>
    </svg>
  )
}

export default SvgInProgressIcon
