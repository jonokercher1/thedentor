import { type SVGProps } from 'react'

const PadlockIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={30} height={40} {...props}>
    <path
      fill="currentColor"
      fillRule="nonzero"
      d="M2.813 40c-.774 0-1.436-.28-1.987-.84A2.773 2.773 0 0 1 0 37.144V16.476c0-.786.275-1.458.826-2.018.551-.56 1.213-.839 1.986-.839h3.282V9.048c0-2.504.869-4.637 2.606-6.402C10.438.882 12.54 0 15.005 0s4.565.882 6.3 2.646c1.734 1.765 2.601 3.898 2.601 6.402v4.571h3.282c.773 0 1.435.28 1.986.84.55.559.826 1.231.826 2.017v20.667c0 .786-.275 1.458-.826 2.018-.551.56-1.213.839-1.986.839H2.813Zm0-2.857h24.375V16.476H2.813v20.667Zm12.195-6.667a3.48 3.48 0 0 0 2.547-1.049c.703-.7 1.054-1.54 1.054-2.522 0-.953-.354-1.818-1.062-2.595-.709-.778-1.56-1.167-2.555-1.167-.995 0-1.844.389-2.547 1.167-.703.777-1.054 1.65-1.054 2.619 0 .968.354 1.801 1.062 2.5a3.508 3.508 0 0 0 2.555 1.047ZM8.906 13.62h12.188V9.048c0-1.72-.592-3.182-1.776-4.385-1.184-1.204-2.621-1.806-4.312-1.806-1.692 0-3.131.602-4.319 1.806-1.187 1.203-1.78 2.665-1.78 4.385v4.571ZM2.84 37.143V16.476v20.667Z"
    />
  </svg>
)
export default PadlockIcon