import { SVGProps } from 'react'

function SvgECharIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 9 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.207 6.986c1.165 0 2.166-.742 2.6-1.803h1.024C8.353 6.815 6.911 8 5.207 8 3.503 8 2.061 6.815 1.583 5.183h1.024c.434 1.06 1.435 1.803 2.6 1.803Zm0-5.972c-1.165 0-2.166.742-2.6 1.803H1.583C2.061 1.185 3.503 0 5.207 0c1.704 0 3.146 1.185 3.624 2.817.145.529.169.938.169 1.127 0 .3-.024.507-.024.507H0l.748-.987h7.245s-.061-.365-.185-.647c-.435-1.06-1.436-1.803-2.6-1.803Z"
        fill="#65FEB7"
      />
    </svg>
  )
}

export default SvgECharIcon
