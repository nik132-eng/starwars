import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import './Navbar.scss';
import logo from '/assets/logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img
            src={logo} 
            alt="Star Wars Logo"
          />
        </Link>

        {/* Hamburger Menu */}
        <div className="navbar-toggle" onClick={toggleNavbar}>
          ☰
        </div>

        <div className={`navbar-links ${isOpen ? 'active' : ''}`}>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div className="navbar-auth">
          <SignedIn>
            <Link to="/dashboard" className="auth-link">Dashboard</Link>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <Link to="/login" className="auth-link">Login</Link>
          </SignedOut>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
