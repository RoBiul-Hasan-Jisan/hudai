import React from 'react'

interface LoadingProps {
  size?: 'small' | 'medium' | 'large'
  text?: string
}

const Loading: React.FC<LoadingProps> = ({ size = 'medium', text = 'Loading...' }) => {
  const sizes = {
    small: 'w-10 h-10',
    medium: 'w-16 h-16',
    large: 'w-24 h-24'
  }

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div 
        className={`${sizes[size]} border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin`}
      ></div>
      {text && <p className="mt-4 text-gray-600">{text}</p>}
    </div>
  )
}

export default Loading