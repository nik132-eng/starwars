import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
    isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
    login: () => {
      localStorage.setItem('isAuthenticated', 'true');
      set({ isAuthenticated: true });
    },
    logout: () => {
      localStorage.removeItem('isAuthenticated');
      set({ isAuthenticated: false });
    },
  }));
  