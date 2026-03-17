import { supabase } from "@/lib/supabase";

const MAX_SESSIONS = 2;

export const createSession = async (userId: string, token: string) => {
    const { data: sessions } = await supabase
        .from("user_sessions")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: true });

    if (sessions && sessions.length >= MAX_SESSIONS) {
        await supabase
            .from("user_sessions")
            .delete()
            .eq("id", sessions[0].id);
    }

    await supabase.from("user_sessions").insert({
        user_id: userId,
        session_token: token,
    });
};

export const validateSession = async (token: string) => {
    const { data } = await supabase
        .from("user_sessions")
        .select("id")
        .eq("session_token", token)
        .single();
    return !!data;
};

export const deleteSession = async (token: string) => {
    await supabase
        .from("user_sessions")
        .delete()
        .eq("session_token", token);
};