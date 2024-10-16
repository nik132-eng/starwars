import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black bg-opacity-90 bg-[url('/stars-background.jpg')] bg-cover bg-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-yellow-400 mb-4" style={{ textShadow: '0 0 10px rgba(255, 215, 0, 0.7)' }}>
          404
        </h1>
        <p className="text-2xl text-white mb-8">These aren't the droids you're looking for...</p>
        <Button asChild>
          <Link to="/" className="bg-yellow-400 text-black hover:bg-yellow-500 font-bold py-2 px-4 rounded-full transition-colors">
            Return to the Galaxy
          </Link>
        </Button>
      </div>
    </div>
  )
}