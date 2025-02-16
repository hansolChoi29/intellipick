// // src/store/dataStore.ts
// import { create } from "zustand";
// import { persist, createJSONStorage } from "zustand/middleware";
// import { AuthState, User } from "../types/auth";

// const useAuthStore = create<AuthState>()(
//   persist(
//     (set) => ({
//       user: null,
//       isAuthenticated: false,
//       setUser: (user: User | null) => {
//         set({ user, isAuthenticated: user !== null });
//       },
//       setIsAuthenticated: (isAuthenticated: boolean) => {
//         set({ isAuthenticated });
//       },
//       signOut: () => set({ user: null, isAuthenticated: false }),
//     }),
//     {
//       name: "auth-storage",
//       storage: createJSONStorage(() => localStorage),
//     }
//   )
// );
// src/store/authStore.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { User } from "../types/auth";

// 상태 타입 정의
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  signOut: () => void;
}

// zustand store 설정
const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setUser: (user: User | null) => {
        set({ user, isAuthenticated: user !== null });
        // 로그인 성공 후 상태를 localStorage에 저장
        localStorage.setItem("user", JSON.stringify(user));
      },
      setIsAuthenticated: (isAuthenticated: boolean) =>
        set({ isAuthenticated }),
      signOut: () => {
        set({ user: null, isAuthenticated: false });
        localStorage.removeItem("user"); // 로그아웃 시 localStorage에서 사용자 정보 삭제
      },
    }),
    {
      name: "auth-storage", // localStorage에 저장할 key
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAuthStore;
