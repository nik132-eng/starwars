import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
import './Navbar.scss'

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">STAR WARS</Link>

        <div className="navbar-links">
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
