// 'use client'
// import { useAuth } from "@/lib/supabase/supabase-auth-provider";
// import { useSupabase } from "@/lib/supabase/supabase-provider";
// import { R100PowerStatsAtom, powerStatsT } from "@/store/atoms";
// import { useAtom, useAtomValue } from "jotai";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";
// import useSWR from "swr";

// const useStats = () => {
//   // Auth & Supabase
//   const { user } = useAuth();
//   const { supabase } = useSupabase();

//   // States
//   const [power, setPower] = useAtom(R100PowerStatsAtom);

//   const router = useRouter();

//   // single play re100run_power - sort by created_at
//   const fetcher = async () => {
//     const { data: power, error } = await supabase
//       .from("re100run_power")
//       .select(`*`)
//       // .eq("owner", user?.id)
//       .order("created_at", { ascending: false });

//     if (error) throw error;
//     // return for data format change
//     // same as return data
//     return power as powerStatsT[];
//   };

//   const { data, error, isLoading, mutate } = useSWR(
//     user ? ["energyAll", user.id] : null,
//     fetcher
//   );



//   // Set Chats
//   useEffect(() => {
//     setPower(data ?? []);
//   }, [data, setPower]);

//   return {
//     runs,
//     isLoading,
//     error,
//     mutate,
//     addRun,
//   };
// };

// export default useStats;


