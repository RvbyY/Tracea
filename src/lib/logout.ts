import { supabase } from "./supabase";
import { deleteSession } from "./sessions";

export const logout = async (navigate: (path: string) => void) => {
    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token;

    if (token)
        await deleteSession(token);
    await supabase.auth.signOut();
    navigate("/login");
};