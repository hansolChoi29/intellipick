export interface User {
  id: string;
  email: string;
  nickname?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  signOut: () => void;
}
//  "@typescript-eslint/no-unused-vars": ["error"], 익거ㅓ 넣었더니 해결됨 근데 이게 좋은코드지는 모르겠어
// 일단 빼
