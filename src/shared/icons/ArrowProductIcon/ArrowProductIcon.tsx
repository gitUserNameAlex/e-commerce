import React from 'react'

type ArrowProductIconProps = React.SVGAttributes<SVGElement> & {
  className?: string
  color?: string
}

const ArrowProductIcon = (props: ArrowProductIconProps) => {
  return (
    <svg
      className={props.className}
      width="31"
      height="31"
      viewBox="0 0 31 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.957 25.6126L20.0439 17.5258C20.9989 16.5708 20.9989 15.008 20.0439 14.0529L11.957 5.96613"
        stroke="white"
        strokeWidth="3"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default ArrowProductIcon
