// App.tsx
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import Navbar from '../src/components/Navbar';  
import { Outlet } from 'react-router-dom';  

const App = () => {
  return (
    <div>
      <Navbar /> 
      <Outlet />  
    </div>
  );
};

export default App;
