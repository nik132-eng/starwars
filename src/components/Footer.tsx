import React from 'react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-yellow-400 py-6 px-4 border-t border-yellow-400">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="text-center">
            <p className="text-lg font-bold">
              © {currentYear} All Rights Reserved by @nikunjrohit
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm italic">
              "May the Force be with you"
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}