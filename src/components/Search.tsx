import { SearchIcon } from 'lucide-react'
import { useState, useEffect } from 'react'

export const Search = ({
  placeholder = 'Search for a country...',
  onSearch,
  defaultValue = '',
}) => {
  const [query, setQuery] = useState(defaultValue)

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onSearch(query)
    }, 300)
    return () => clearTimeout(timeoutId)
  }, [query, onSearch])

  return (
    <div className="search-container">
      <div className="search-icon">
        <SearchIcon className="h-5 w-5 text-gray-400 dark:text-gray-500" />
      </div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="search-input"
      />
    </div>
  )
}
