export interface User {
  id: string;
  email: string;
  nickname?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  signOut: () => void;
}
