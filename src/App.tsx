// App.tsx
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import Navbar from '../src/components/Navbar';  
import { Outlet } from 'react-router-dom';  
import Footer from './components/Footer';

const App = () => {
  return (
    <div>
          <Navbar /> 
          <Outlet />  
          <Footer />
    </div>
  );
};

export default App;
