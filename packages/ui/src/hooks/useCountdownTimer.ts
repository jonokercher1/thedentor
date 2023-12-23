'use client'

import dayjs, { Dayjs } from 'dayjs'
import { useEffect, useState } from 'react'

const useCountdownTimer = (target: Dayjs) => {
  const [countdown, setCountdown] = useState(target.diff(dayjs()))

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(target.diff(dayjs()))
    }, 1000)

    return () => clearInterval(interval)
  }, [target])

  return Math.max(countdown, 0)
}

export default useCountdownTimer