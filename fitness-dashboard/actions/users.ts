"use server"

import { getSupabaseAuth } from "@/lib/auth"
import { Provider } from "@supabase/supabase-js"

export const loginAction = async (provider: Provider) => {
    try {
        const supabase = await getSupabaseAuth();
        const { data, error } = await supabase.signInWithOAuth({
            provider,
            options: {
                redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth`,
            },
        });

        if (error) throw error;

        return { errorMessage: null, url: data.url };
    } catch (error) {
        return {errorMessage: "Error logging in"}
    }
}

export const signOutAction = async () => {
    try {
        const supabase = await getSupabaseAuth();
        const { error } = await supabase.signOut();

        if (error) throw error;

        return { errorMessage: null };
    } catch (error) {
        return {errorMessage: "Error signing out"}
    }
}