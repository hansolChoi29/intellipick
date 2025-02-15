// // src/store/authStore.ts
import { persist, createJSONStorage } from "zustand/middleware";
import { AuthState, User } from "../types/auth";
import { create } from "zustand";

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setUser: (user: User | null) =>
        set({ user, isAuthenticated: user !== null }),
      setIsAuthenticated: (isAuthenticated: boolean) =>
        set({ isAuthenticated }),
      signOut: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAuthStore;
// src/store/authStore.ts

// 상태 정의

// 상태 정의
// interface AuthState {
//   isAuthenticated: boolean;
//   user: any; // 실제 사용자 정보 타입을 정의할 수 있습니다
//   setUser: (user: any) => void;
//   signOut: () => void;
// }

// import create from "zustand";
// import { create } from "zustand";
// import { AuthState, User } from "../types/auth";

// const useAuthStore = create<AuthState>((set) => ({
//   user: null,
//   isAuthenticated: false,
//   setUser: (user: User | null) => {
//     set({ user, isAuthenticated: user !== null });
//   },
//   setIsAuthenticated: (isAuthenticated: boolean) => set({ isAuthenticated }),
//   signOut: () => {
//     set({ user: null, isAuthenticated: false });
//   },
// }));

// export default useAuthStore;
