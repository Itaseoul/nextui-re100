"use client";

import { ClientID } from "@/store/atoms";
import { ProfileT } from "@/types/collections";
import { Session } from "@supabase/supabase-js";
import { useSetAtom } from "jotai";
import { redirect, useRouter } from "next/navigation";
import { createContext, useContext, useEffect } from "react";
import useSWR from "swr";
import { useSupabase } from "./supabase-provider";


// context 만들기 
interface ContextI {
  user: ProfileT | null | undefined;
  error: any;
  isLoading: boolean;
  mutate: any;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<string | null>;
  signUpWithEmailandPassword: (email: string, password: string) => Promise<string | null>;
  resetPasswordForEmail: (email: string) => Promise<string | null>;
  updatePassword: (password: string) => Promise<string | null>;
}

const Context = createContext<ContextI>({
  user: null,
  error: null,
  isLoading: true,
  mutate: null,
  signOut: async () => { },
  signInWithGoogle: async () => { },
  signInWithEmail: async (email: string, password: string) => null,
  signUpWithEmailandPassword: async (email: string, password: string) => null,
  resetPasswordForEmail: async (email: string) => null,
  updatePassword: async (password: string) => null,

});




export default function SupabaseAuthProvider({
  serverSession,
  children,
}: {
  serverSession?: Session | null;
  children: React.ReactNode;
}) {

  const { supabase } = useSupabase();
  const router = useRouter();
  const setClientID = useSetAtom(ClientID); // clientID를 set하는 atom을 생성해준다.

  // Get USER
  const getUser = async () => {
    const { data: user, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", serverSession?.user?.id)
      .single();
    if (error) {
      console.log(error);
      return null;
    } else {
      return user;
    }
  };

  const {
    data: user,
    error,
    isLoading,
    mutate,
  } = useSWR(
    serverSession ? "profile-context" : null  //  fetch를 수행하기 위한 URL 혹은 endpoint 
    , getUser); // 가져올 fetch 함수

  /**
  serverSession 값이 true일 경우 "profile-context" 값을, 아닐 경우 null 값을 사용하고 있습니다. 
  이것은 서버 세션이 있는 경우에만 -- 해당 URL로 fetch를 수행하도록 하기 위함입니다.
  */

  // Sign Out
  const signOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    console.log("Signed Out! (from supabase-auth-provider.tsx)");
  };






  // Sign-In with Github
  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo:
          process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
            ? "https://ai.makr.dev/energy"
            : "http://localhost:3000/energy",
      },
    });
  };

  //  reference function 
  const getURL = () => {
    let url =
      process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
      process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
      'http://localhost:3000/';
    // Make sure to include `https://` when not localhost.
    url = url.includes('http') ? url : `https://${url}`;
    // Make sure to including trailing `/`.
    url = url.charAt(url.length - 1) === '/' ? url : `${url}/`;
    return url;
  };
  // options: {
  //   redirectTo: getURL()
  // }



  // Sign-In with Email
  const signInWithEmail = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return error.message;
    }
    return null;
  };




  // Sign-Up with email & password
  const signUpWithEmailandPassword = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      return error.message;
    }
    return null;
  };

  // password reset
  const resetPasswordForEmail = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(
      email, {
      redirectTo:
        process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
          ? "https://ai.makr.dev/update-password"
          : "http://localhost:3000/update-password",
    })
    if (error) {
      return error.message;
    }
    return null;
  };

  // password update
  const updatePassword = async (password: string) => {
    const { error } = await supabase.auth.updateUser({
      password
    });
    if (error) {
      return error.message;
    }
    return null;
  }


  // Set Owner ID
  useEffect(() => {
    if (user) {
      setClientID(user.id);
    }
  }, [setClientID, user]);

  // Refresh the Page to Sync Server and Client
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) => {
      if (session?.access_token !== serverSession?.access_token) {
        router.refresh();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router, supabase, serverSession?.access_token]);



  const exposed: ContextI = {
    user,
    error,
    isLoading,
    mutate,
    signOut,
    signInWithGoogle,
    signInWithEmail,
    signUpWithEmailandPassword,
    resetPasswordForEmail,
    updatePassword
  };

  return (
    <Context.Provider
      value={exposed}>
      {children}
    </Context.Provider>
  );
}



// useauth 훅 정의 
export const useAuth = () => {
  let context = useContext(Context);
  if (context === undefined) {
    throw new Error("useAuth must be used inside SupabaseAuthProvider");
  } else {
    return context;
  }
};
