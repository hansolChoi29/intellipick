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
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { AuthState, User } from "../types/auth";

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setUser: (user: User | null) => {
        set({ user, isAuthenticated: user !== null });
        localStorage.setItem("user", JSON.stringify(user));
      },
      setIsAuthenticated: (isAuthenticated: boolean) =>
        set({ isAuthenticated }),
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
