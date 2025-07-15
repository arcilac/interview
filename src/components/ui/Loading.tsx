import { Loader2 } from 'lucide-react'

export const Loading = ({ text = 'Loading...', className = '' }) => {
  return (
    <div className={`loading-container ${className}`}>
      <div className="loading-content">
        <Loader2 className="loading-spinner" />
        <p className="loading-text">{text}</p>
      </div>
    </div>
  )
}
