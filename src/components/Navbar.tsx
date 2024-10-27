import React, { useState } from 'react'
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react'
import { Link } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Menu, X } from 'lucide-react'
import logo from '../../assets/logo.png'
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleNavbar = () => {
    setIsOpen(!isOpen)
  }

  return (
    <nav className="bg-gray-900 text-yellow-400 border-b border-yellow-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <img
                className="h-10 w-auto"
                src={logo}
                alt="Star Wars Logo"
              />
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/contact">Contact</NavLink>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <SignedIn>
              <div className=''>
                <NavLink to="/pdflist">
                  Books
                </NavLink>
              </div>
              <NavLink to="/dashboard">
                Dashboard
              </NavLink>
                <UserButton 
                  appearance={{
                    elements: {
                      avatarBox: "w-10 h-10 rounded-full border-2 border-yellow-400",
                    }
                  }}
                />
              </SignedIn>
              <SignedOut>
                <Button asChild variant="outline" className="text-yellow-400 border-yellow-400 hover:bg-yellow-400 hover:text-black">
                  <Link to="/auth">Login</Link>
                </Button>
              </SignedOut>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <Button
              onClick={toggleNavbar}
              variant="ghost"
              size="icon"
              className="inline-flex items-center justify-center p-2 rounded-md text-yellow-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink to="/" mobile>Home</NavLink>
            <NavLink to="/about" mobile>About</NavLink>
            <NavLink to="/contact" mobile>Contact</NavLink>
            <SignedIn>
              <NavLink to="/dashboard" mobile>Dashboard</NavLink>
            </SignedIn>
            <SignedIn>
              <NavLink to="/pdflist" mobile>Books</NavLink>
            </SignedIn>
            <SignedOut>
              <NavLink to="/auth" mobile>Login</NavLink>
            </SignedOut>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-700">
            <SignedIn>
              <div className="flex items-center px-5">
                <UserButton 
                  appearance={{
                    elements: {
                      avatarBox: "w-10 h-10 rounded-full border-2 border-yellow-400",
                    }
                  }}
                />
              </div>
            </SignedIn>
          </div>
        </div>
      )}
    </nav>
  )
}

interface NavLinkProps {
  to: string
  children: React.ReactNode
  mobile?: boolean
}

function NavLink({ to, children, mobile = false }: NavLinkProps) {
  const baseClasses = "text-yellow-400 hover:bg-yellow-400 hover:text-black rounded-md font-medium"
  const desktopClasses = "px-3 py-2 text-sm"
  const mobileClasses = "block px-3 py-2 text-base"

  return (
    <Link
      to={to}
      className={`${baseClasses} ${mobile ? mobileClasses : desktopClasses}`}
    >
      {children}
    </Link>
  )
}