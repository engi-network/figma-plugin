import { SVGProps } from 'react'

function CalendarIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M14.167 2.499H17.5a.833.833 0 0 1 .833.833v13.333a.834.834 0 0 1-.833.834h-15a.833.833 0 0 1-.833-.834V3.332a.833.833 0 0 1 .833-.833h3.333V.832H7.5v1.667h5V.832h1.667v1.667ZM12.5 4.165h-5v1.667H5.833V4.165h-2.5V7.5h13.334V4.165h-2.5v1.667H12.5V4.165Zm4.167 5H3.333v6.667h13.334V9.165Z"
        fill="#fff"
      />
    </svg>
  )
}

export default CalendarIcon
