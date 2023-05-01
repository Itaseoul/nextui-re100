import DashBoard from "@/components/Energy/dummy_DashBoard";
import RunRecords from "@/components/Energy/runRecords";
import TotalPowerStats from "@/components/Energy/totalPowerStats";
import MobileMenuButton from "@/components/navigation/mobile-menu-button";
import InitiateMap from "../../components/Energy/EnergyMap";
import { Suspense } from 'react'
import RunPage from './run'
export default function Run() {

  return (
    <main className="relative   ">

      <section>
        {/* 연결안내문 */}
        <p> 모바일 핫스팟을 re100run / herald 로 설정해주세요
          디바이스의 전원을 켜주세요
          디바이스가 연결되면,
          하단의 러닝시작 버튼이 활성화됩니다.
          상단에는 연결 불이 들어옵니다. </p>
      </section>

      <Suspense fallback={<div>Loading...</div>}>
        <RunPage />
      </Suspense>
    </main>
  );
}
