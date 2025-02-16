import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
const useAuthStore = create()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setUser: (user) => {
        set({ user, isAuthenticated: user !== null });
        localStorage.setItem("user", JSON.stringify(user));
      },
      setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
      signOut: () => {
        set({ user: null, isAuthenticated: false });
        localStorage.removeItem("user");
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
export default useAuthStore;
