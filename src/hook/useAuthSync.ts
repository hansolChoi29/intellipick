import { useEffect } from "react";
import useAuthStore from "../store/authStore";
import { supabase } from "../supabase/supabase";

const useAuthSync = () => {
  const { setUser, setIsAuthenticated } = useAuthStore();

  useEffect(() => {
    const syncUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (data?.session) {
        setUser({
          id: data.session.user.id,
          email: data.session.user.email || "",
          nickname: data.session.user.user_metadata?.nickname || "",
        });
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    };

    syncUser();
  }, [setUser, setIsAuthenticated]);

  return null;
};

export default useAuthSync;
