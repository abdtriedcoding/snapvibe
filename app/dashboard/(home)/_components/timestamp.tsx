'use client'

import ReactTimeago from 'react-timeago'

export default function Timestamp({ createdAt }: { createdAt: Date }) {
  return (
    <ReactTimeago
      className="text-xs font-medium text-neutral-500 dark:text-neutral-400"
      date={createdAt}
      formatter={(value, unit, suffix, epochMiliseconds, nextFormatter) => {
        // Example: if its 7 min, return "7m", if its 7 hours, return "7h" like that
        if (unit === 'second') {
          return `${value}${unit[0]}`
        } else if (unit === 'minute') {
          return `${value}${unit[0]}`
        } else if (unit === 'hour') {
          return `${value}${unit[0]}`
        } else if (unit === 'day') {
          return `${value}${unit[0]}`
        } else if (unit === 'week') {
          return `${value}${unit[0]}`
        } else if (unit === 'month') {
          return `${value}${unit[0]}`
        } else if (unit === 'year') {
          return `${value}${unit[0]}`
        } else {
          return nextFormatter?.(value, unit, suffix, epochMiliseconds)
        }
      }}
    />
  )
}
