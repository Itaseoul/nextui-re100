import RunRecords from "@/components/Energy/runRecords";
import TotalPowerStats from "@/components/Energy/totalPowerStats";
import MobileMenuButton from "@/components/navigation/mobile-menu-button";

import { Suspense } from 'react'
import EnergyMap from "../../components/Energy/EnergyMap";
export default function Home() {

  return (
    <main className="relative flex flex-col items-stretch flex-1 w-full h-full 
    ml-0 overflow-hidden transition-all transition-width 
    md:ml-64 
    dark:bg-neutral-900 bg-neutral-50">
      <div className="flex-1 ">
        <MobileMenuButton />

        <Suspense fallback={<div>Loading...</div>}>
          <TotalPowerStats />
        </Suspense>

        <Suspense fallback={<div>Loading...</div>}>
          <RunRecords />
        </Suspense>

        <Suspense fallback={<div>Loading...</div>}>
          <EnergyMap />
        </Suspense>

      </div>




    </main>
  );
}
