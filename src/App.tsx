import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import Navbar from '../src/components/Navbar';  
import { Outlet } from 'react-router-dom';  
import Footer from './components/Footer';
import { Toaster } from 'react-hot-toast'

const App = () => {
  return (
    <div>
          <Navbar /> 
          <Outlet />  
          <Footer />
          <Toaster />
    </div>
  );
};

export default App;
