"use client";
import useRuns from "@/hooks/useRuns";
import Spinner from "../ui/spinner";
import Image from "next/image";
import { RiPinDistanceLine } from "react-icons/ri";
import { FaRunning } from "react-icons/fa";
import { CalendarClock } from "lucide-react";


const TotalPowerStats = () => {
  const { totalPower, isLoading } = useRuns();

  return (
    <div className="flex flex-col my-4 p-4 overflow-hidden border border-dashed ">
      {/* power */}

      {totalPower ? (
        <div className="space-y-2">
          <div className="text-lg flex gap-x-4 items-center">
            <Image
              className="object-contain"
              width={50}
              height={50}
              src="/sample-Re100Plant.png"
              alt="sample-Re100Plant"
            />
            <div className="text-3xl font-bold">{totalPower.total_power}{" wh"}</div>

          </div>
          <div className="flex items-center">
            <div className="text-lg flex gap-x-1 items-center">
              <span><FaRunning className="w-4 h-4" /></span>
              {totalPower.number_of_runs}{"회"}
            </div>
            <div className="text-lg flex gap-x-1 items-center">
              <span><RiPinDistanceLine className="w-4 h-4" /></span>
              {totalPower.total_distance}{"m"}
            </div>
            <div className="text-lg flex gap-x-1 items-center">
              <span><CalendarClock className="w-4 h-4" /></span>
              {totalPower.total_time}{" 분"}
            </div>
          </div>
        </div>

      ) : (
        <div className="flex items-center justify-center w-full h-full py-10">
          <Spinner size="lg" />
        </div>
      )
      }
    </div>

  );
};

export default TotalPowerStats;
