import { SVGProps } from 'react'

function SvgCameraIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 17 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <ellipse
        opacity={0.4}
        rx={5.834}
        ry={4.243}
        transform="matrix(.96511 -.53656 .3407 .86733 8.959 6.917)"
        fill="#fff"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.037 1.558a.935.935 0 0 0-.067.435l-2.84-.022A2.063 2.063 0 0 0 .046 4.052l.078 6.892a2.167 2.167 0 0 0 2.132 2.136l11.673.094a2.067 2.067 0 0 0 2.104-2.082l-.078-6.912c-.013-1.152-.974-2.106-2.131-2.116l-3.042-.024a.92.92 0 0 0-.063-.437l-.19-.454c-.15-.372-.587-.663-.959-.666L6.161.456c-.372-.003-.802.26-.943.65l-.18.452Zm2.93 8.75a2.972 2.972 0 0 1-2.946-2.925 2.837 2.837 0 0 1 2.88-2.877 2.973 2.973 0 0 1 2.947 2.924 2.837 2.837 0 0 1-2.88 2.878Zm5.346-5.861a.37.37 0 0 1-.355-.353.353.353 0 0 1 .348-.347.37.37 0 0 1 .355.353.353.353 0 0 1-.348.347ZM7.957 9.378a1.913 1.913 0 0 0 1.94-1.938 2.005 2.005 0 0 0-1.985-1.97 1.913 1.913 0 0 0-1.94 1.938c.012 1.08.9 1.962 1.985 1.97Z"
        fill="url(#camera-icon_svg__a)"
      />
      <defs>
        <linearGradient
          id="camera-icon_svg__a"
          x1={1.028}
          y1={13.118}
          x2={16.59}
          y2={9.146}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#BA54EC" />
          <stop offset={1} stopColor="#F27B52" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default SvgCameraIcon
