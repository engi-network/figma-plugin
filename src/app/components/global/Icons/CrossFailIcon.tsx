import { SVGProps } from 'react'

function CrossFailIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="14" cy="14" r="14" fill="#FF5F5F" />
      <path
        d="M14 12.8213L18.125 8.69629L19.3033 9.87462L15.1783 13.9996L19.3033 18.1246L18.125 19.303L14 15.178L9.87499 19.303L8.69666 18.1246L12.8217 13.9996L8.69666 9.87462L9.87499 8.69629L14 12.8213Z"
        fill="#5C5C41"
      />
    </svg>
  )
}

export default CrossFailIcon
