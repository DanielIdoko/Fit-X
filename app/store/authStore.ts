import { create } from "zustand";
import * as SecureStore from "expo-secure-store";
import { supabase } from "../lib/supabase";

interface AuthState {
  session: any | null;
  user: any | null;
  loading: boolean;
  error: string | null;

  initialize: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}
// (() => ({}))
export const useAuthStore = create<AuthState>((set) => ({
  session: null,
  user: null,
  loading: true,
  error: null,

  initialize: async () => {
    const stored = await SecureStore.getItemAsync("session");

    if (stored) {
      const session = JSON.parse(stored);
      set({ session, user: session.user, loading: false });
    } else {
      set({ loading: false });
    }

    supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session) {
        await SecureStore.setItemAsync("session", JSON.stringify(session));
        set({ session, user: session.user });
      } else {
        await SecureStore.deleteItemAsync("session");
        set({ session: null, user: null });
      }
    });
  },

  signIn: async (email, password) => {
    set({ loading: true, error: null });

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    set({ loading: false });
    if (error) throw error;
  },

  signUp: async (email, password) => {
    set({ loading: true, error: null });

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    set({ loading: false });
    if (error) throw error;
  },

  signInWithGoogle: async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "decal://",
      },
    });
  },

  signOut: async () => {
    await supabase.auth.signOut();
  },
}));
