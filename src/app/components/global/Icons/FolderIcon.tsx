import { SVGProps } from 'react'

function SvgFolderIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        opacity={0.4}
        fill="#fff"
        d="m5.859 10.69 5.17-2.833 2.816 6.225-5.171 2.833z"
      />
      <path
        d="M17.756 4.347h-6.317L9.857 3.073a.692.692 0 0 0-.446-.157H4.883a.723.723 0 0 0-.721.716l-.018 2.147h2.03c.311 0 .617.103.86.29l1.04.783h7.936c.684 0 1.271.485 1.395 1.153l.994 5.183.066-8.125a.706.706 0 0 0-.71-.716Z"
        fill="url(#folder-icon_svg__a)"
      />
      <path
        d="M17.756 4.347h-6.317L9.857 3.073a.692.692 0 0 0-.446-.157H4.883a.723.723 0 0 0-.721.716l-.018 2.147h2.03c.311 0 .617.103.86.29l1.04.783h7.936c.684 0 1.271.485 1.395 1.153l.994 5.183.066-8.125a.706.706 0 0 0-.71-.716Z"
        fill="#000"
        fillOpacity={0.5}
      />
      <path
        d="M16.7 8.14a.706.706 0 0 0-.696-.572H7.83l-1.235-.93a.707.707 0 0 0-.428-.144H2.42a.714.714 0 0 0-.712.84l1.585 9.306a.71.71 0 0 0 .7.59H17.57c.215 0 .42-.096.557-.265a.714.714 0 0 0 .151-.593L16.701 8.14Zm-4.672 4.87-1.804 1.79a.364.364 0 0 1-.39.077.353.353 0 0 1-.117-.078L7.943 13.01a.358.358 0 0 1 .004-.506.358.358 0 0 1 .506 0l1.169 1.178.031-3.788a.361.361 0 0 1 .36-.358c.199 0 .357.16.356.358l-.031 3.788 1.188-1.178a.358.358 0 0 1 .506 0 .357.357 0 0 1-.004.506Z"
        fill="url(#folder-icon_svg__b)"
      />
      <defs>
        <linearGradient
          id="folder-icon_svg__a"
          x1={4.127}
          y1={8.059}
          x2={18.462}
          y2={8.177}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F27B50" />
          <stop offset={1} stopColor="#BA54EC" />
        </linearGradient>
        <linearGradient
          id="folder-icon_svg__b"
          x1={1.661}
          y1={11.87}
          x2={18.356}
          y2={12.007}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F27B50" />
          <stop offset={1} stopColor="#BA54EC" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default SvgFolderIcon
