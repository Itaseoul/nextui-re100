import { R100RunAtom } from "@/v2.3.0_re100run_bak_redux_legacy/atoms_ref/data";
import { useAuth } from "@/lib/supabase/supabase-auth-provider";
import { useSupabase } from "@/lib/supabase/supabase-provider";
import { ChatWithMessageCountAndSettings, R100PowerT, R100RunT, R100RunT_I } from "@/types/collections";
import { useAtom, useAtomValue } from "jotai";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useSWR from "swr";

const useStats = () => {
  // Auth & Supabase
  const { user } = useAuth();
  const { supabase } = useSupabase();

  // States
  const [runs, setRuns] = useAtom(R100RunAtom);

  const router = useRouter();

  // single play re100run_power - sort by created_at 
  const fetcher = async () => {
    const { data, error } = await supabase
      .from("re100run_power")
      .select(`*`)
      // .eq("owner", user?.id)
      .order("created_at", { ascending: false });

    if (error) throw error;
    // return for data format change
    // same as return data
    return data.map((energy) => {
      return {
        ...energy,
      };
    }) as R100PowerT[];
  };

  const { data, error, isLoading, mutate } = useSWR(
    user ? ["energyAll", user.id] : null,
    fetcher
  );

  // Add New Chat Handler
  const addRun = async () => {
    const { data: newRun, error } = await supabase
      .from("re100run_run")
      .insert({
        profile_id: user?.id as string,
        distance: 230,
        duration: 28,
        start: Date.now().toLocaleString(),
        end: Date.now().toLocaleString(),
        end_place: ["37.123456", "127.123456"],
        start_place: ["37.123456", "127.123456"]
      })
      .select(`*`)
      .returns<R100RunT[]>()
    if (error && !newRun) {
      console.log(error);
      return;
    }

    // Add it to the top of the list
    mutate((prev: any) => {
      if (prev && prev.length > 0) {
        return [newRun, ...prev];
      } else {
        return [newRun];
      }
    });

    // Redirect to the new chat
    // router.push(`/chat/${newChat.id}?new=true`);
  };

  // Set Chats
  useEffect(() => {
    setRuns(data ?? []);
  }, [data, setRuns]);

  return {
    runs,
    isLoading,
    error,
    mutate,
    addRun,
  };
};

export default useStats;


