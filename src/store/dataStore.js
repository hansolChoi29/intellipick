import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
const useDataStore = create()(persist((set) => ({
    user: null,
    isAuthenticated: false,
    setUser: (user) => set({ user, isAuthenticated: user !== null }),
    setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
    signOut: () => set({ user: null, isAuthenticated: false }),
}), {
    name: "auth-storage",
    storage: createJSONStorage(() => localStorage),
}));
export default useDataStore;
