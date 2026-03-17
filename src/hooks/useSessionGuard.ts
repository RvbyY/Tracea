import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { validateSession } from "@/lib/sessions";

const useSessionGuard = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const checkSession = async () => {
            const { data } = await supabase.auth.getSession();
            const session = data.session;
            if (!session) {
                navigate("/login");
                return;
            }
            const isValid = await validateSession(session.access_token);
            if (!isValid) {
                await supabase.auth.signOut();
                navigate("/login");
            }
        };
        checkSession();
    }, [navigate]);
};

export default useSessionGuard;