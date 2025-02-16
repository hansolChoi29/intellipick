import { useEffect } from "react";
import useAuthStore from "../store/authStore";
import { supabase } from "../supabase/supabase";
const useAuthSync = () => {
    const { setUser, setIsAuthenticated } = useAuthStore();
    useEffect(() => {
        const syncUser = async () => {
            const { data: session, error } = await supabase.auth.getSession();
            if (error) {
                console.error("Session Error:", error);
                setIsAuthenticated(false);
                return;
            }
            if (session && session.session?.user) {
                const { id, email, user_metadata } = session.session.user;
                setUser({
                    id: id,
                    email: email || "",
                    nickname: user_metadata?.nickname || "",
                });
                setIsAuthenticated(true);
            }
            else {
                setIsAuthenticated(false);
            }
        };
        syncUser();
        const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session && session.user) {
                const { id, email, user_metadata } = session.user;
                setUser({
                    id: id,
                    email: email || "",
                    nickname: user_metadata?.nickname || "",
                });
                setIsAuthenticated(true);
            }
            else {
                setIsAuthenticated(false);
            }
        });
        return () => {
            authListener?.subscription?.unsubscribe();
        };
    }, [setUser, setIsAuthenticated]);
    return null;
};
export default useAuthSync;
