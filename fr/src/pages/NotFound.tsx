import React from 'react'
import { Link } from 'react-router-dom'
import { Home, ArrowLeft } from 'lucide-react'

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-blue-600">404</h1>
          <h2 className="mt-4 text-3xl font-bold text-gray-900">Page not found</h2>
          <p className="mt-4 text-lg text-gray-600">
            Sorry, we couldn't find the page you're looking for.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            to="/"
            className="w-full btn btn-primary inline-flex items-center justify-center"
          >
            <Home className="mr-2" size={20} />
            Go back home
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="w-full btn btn-outline inline-flex items-center justify-center"
          >
            <ArrowLeft className="mr-2" size={20} />
            Go back
          </button>
        </div>
      </div>
    </div>
  )
}

export default NotFound