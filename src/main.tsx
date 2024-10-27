import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import { routes } from './route'; 
import { ClerkProvider } from '@clerk/clerk-react';
import './input.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, 
      retry: false,                 
      staleTime: 1000 * 60 * 5,
    },
  },
});

const clerkFrontendApi = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!clerkFrontendApi) {
  throw new Error('Clerk Frontend API key is not defined in environment variables');
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<StrictMode>
	  <ClerkProvider publishableKey={clerkFrontendApi} appearance={{
        elements: {
          footer: "hidden",
          header: "hidden"
        },
      }}>
		<QueryClientProvider client={queryClient}>
		  <RouterProvider router={routes} /> 
		</QueryClientProvider>
	  </ClerkProvider>
	</StrictMode>
  );