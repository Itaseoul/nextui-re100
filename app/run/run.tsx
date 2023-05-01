'use client'

import { memo } from "react";
import { BiArrowFromRight } from "react-icons/bi";
import { FaMoon, FaRunning, FaSun, FaUserAlt } from "react-icons/fa";

import { useAtomValue, useAtom } from "jotai"
import { Map_isDrawerOpen, Run_deviceConnected } from "@/store/atoms"
import Map from "@/components/Map/Map";
import { cn } from "@/utils/cn";
import { WifiIcon } from "lucide-react";
import { Button } from "@/components/ui/button";


function RunPage() {

  const [getMap_isDrawerOpen, setMap_isDrawerOpen] = useAtom(Map_isDrawerOpen);
  const [get_deviceState, set_deviceState] = useAtom(Run_deviceConnected);


  function openDrawer() {
    setMap_isDrawerOpen(true)
  }

  return (
    <div className="relative h-screen">

      <section>
        {/* 디바이스 연결상태 */}
        <div className={cn(
          "rounded-full w-6 h-6",
          get_deviceState ? "bg-green-500" : "bg-red-500"
        )}>
        </div>
        {get_deviceState ? "연결" : "해지"}
        <Button onClick={() => set_deviceState}>변경</Button>
      </section>

      <section>
        <button onClick={openDrawer}>run</button>
      </section>
      {/* <Map /> */}
    </div>
  );
}

export default memo(RunPage);
