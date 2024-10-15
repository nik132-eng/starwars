import { SignIn } from '@clerk/clerk-react';

export const LoginPage = () => {
  return (
    <div>
      <h1>Login</h1>
      <SignIn />
    </div>
  );
};
