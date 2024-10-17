// App.tsx
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import Navbar from '../src/components/Navbar';  
import { Outlet } from 'react-router-dom';  
import Footer from './components/Footer';
import { HashRouter as Router } from 'react-router-dom';


const App = () => {
  return (
    <div>
        <Router>
          <Navbar /> 
          <Outlet />  
          <Footer />
        </Router>
    </div>
  );
};

export default App;
