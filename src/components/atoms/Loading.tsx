import { Loader2 } from 'lucide-react'

export const Loading = ({
  text = 'Loading...',
  className = '',
}: {
  text?: string
  className?: string
}) => {
  return (
    <div className={`loading-spinner-container ${className}`}>
      <Loader2 className="loading-spinner-icon animate-spin" />
      <span className="loading-spinner-text">{text}</span>
    </div>
  )
}
