'use client'

import { useFormStatus } from 'react-dom'

type Props = {
  children: React.ReactNode
  className: string
  onClick?: () => void
}

export default function SubmitButton({ children, className, onClick }: Props) {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      onClick={onClick}
      disabled={pending}
      className={className}
    >
      {children}
    </button>
  )
}
