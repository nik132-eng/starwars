import { useAuthStore } from '../store/authStore';
import { useState } from 'react';
import { Button, TextInput } from '@mantine/core';

export const LoginPage = () => {
  const login = useAuthStore((state) => state.login);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log("Trying to login with:", { username, password });
    
    if (username === 'admin' && password === 'password') {
      console.log("Login successful");
      login();
    } else {
      console.log("Invalid credentials");
    }
  };

  return (
    <div>
      <TextInput 
        label="Username" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
      />
      <TextInput 
        label="Password" 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
      />
      <Button onClick={handleLogin}>Login</Button>
    </div>
  );
};
