import { SVGProps } from 'react'

function SvgFigmaIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 48 48"
      fill="none"
      {...props}
    >
      <g filter="url(#figma-icon_svg__a)">
        <g clipPath="url(#figma-icon_svg__b)">
          <path
            d="M0 24C0 10.745 10.745 0 24 0s24 10.745 24 24-10.745 24-24 24S0 37.255 0 24Z"
            fill="#000"
            fillOpacity={0.4}
          />
          <g clipPath="url(#figma-icon_svg__c)">
            <path
              d="M19.411 35.599c2.308 0 4.182-1.797 4.182-4.01V27.58H19.41c-2.308 0-4.18 1.796-4.18 4.01 0 2.212 1.872 4.009 4.18 4.009Z"
              fill="#0ACF83"
            />
            <path
              d="M15.232 23.37c0-2.213 1.873-4.009 4.18-4.009h4.182v8.019h-4.181c-2.308 0-4.181-1.796-4.181-4.01Z"
              fill="#A259FF"
            />
            <path
              d="M15.232 15.152c0-2.213 1.873-4.01 4.18-4.01h4.182v8.019h-4.181c-2.308 0-4.181-1.796-4.181-4.01Z"
              fill="#F24E1E"
            />
            <path
              d="M23.802 11.143h4.18c2.309 0 4.182 1.796 4.182 4.009s-1.873 4.009-4.181 4.009h-4.181v-8.018Z"
              fill="#FF7262"
            />
            <path
              d="M32.164 23.37c0 2.214-1.873 4.01-4.181 4.01s-4.181-1.796-4.181-4.01c0-2.213 1.873-4.009 4.18-4.009 2.309 0 4.182 1.796 4.182 4.01Z"
              fill="#1ABCFE"
            />
          </g>
        </g>
      </g>
      <defs>
        <clipPath id="figma-icon_svg__b">
          <path
            d="M0 24C0 10.745 10.745 0 24 0s24 10.745 24 24-10.745 24-24 24S0 37.255 0 24Z"
            fill="#fff"
          />
        </clipPath>
        <clipPath id="figma-icon_svg__c">
          <path
            fill="#fff"
            transform="translate(15.23 11.143)"
            d="M0 0h17.143v24.857H0z"
          />
        </clipPath>
        <filter
          id="figma-icon_svg__a"
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
            result="effect1_backgroundBlur_593_25698"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_backgroundBlur_593_25698"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  )
}

export default SvgFigmaIcon
