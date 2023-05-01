"use client";
import useRuns from "@/hooks/useRuns";
import Spinner from "../ui/spinner";
import dayjs from 'dayjs';
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useAuth } from "@/lib/supabase/supabase-auth-provider";

const RunRecords = () => {
  const { runs, isLoading } = useRuns();
  const { user } = useAuth();

  console.log('runs:', runs);

  return (

    <div className="flex flex-col my-4 p-4 overflow-hidden border border-dashed ">
      {/* runs */}
      {runs && runs?.length > 0 && (
        <h3 className="mt-4 text-sm font-medium sm:mt-6 dark:text-neutral-400 text-neutral-600">
          러닝 <span className="text-xs">({runs?.length})</span>
        </h3>
      )}
      {runs && !isLoading ? (
        <div className="flex flex-col h-full gap-4 mt-2 overflow-y-auto ">
          {runs?.map((run) => (
            <div key={run.id} className="flex space-x-2 items-center">

              {/* Avatar */}
              <Avatar>
                <AvatarImage src={user?.avatar_url ?? ""} />
                <AvatarFallback>
                  {user?.full_name?.slice(0, 2).toLocaleUpperCase() ?? "UU"}
                </AvatarFallback>
              </Avatar>

              {/* duration - min */}
              <div className="text-sm text-neutral-300">{run?.duration}{"분"}</div>
              {/* POWER - wh*/}
              <div className="text-sm text-neutral-300">
                {run?.power}{"wh"}</div>

              {/* time */}
              <div className="text-sm text-neutral-300">{dayjs(run?.start).format('YYYY-MM-DD HH-MM')}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center w-full h-full py-10">
          <Spinner size="lg" />
        </div>
      )}
    </div>

  );
};

export default RunRecords;
