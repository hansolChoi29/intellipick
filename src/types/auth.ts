export interface User {
  id: string;
  email: string;
  nickname?: string;
}

export interface ErrorMessages {
  email?: string;
  password?: string;
  confirmPassword?: string;
  nickname?: string;
  general?: string;
}
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  signOut: () => void;
}
