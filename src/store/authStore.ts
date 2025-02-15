import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { AuthState } from "../types/auth";
// zustand로 관리하고
// localStorage에 저장하는 방식
const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: true }),
      signOut: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAuthStore;
