'use client';
import { DummyEnergyHistoryAtom } from "@/store/atoms";
import { useAtomValue } from "jotai";
import React from 'react'

type Props = {}

export default function DashBoard({ }: Props) {
  const DummyEnergyHistory = useAtomValue(DummyEnergyHistoryAtom);

  return (

    <div>

      <div className='p-3'>
        <div>발전현황</div>
        {DummyEnergyHistory?.map((item) => (
          <div key={item.id}
            className='p-5 border flex justify-between'
          >
            <div> {item.profile_id} </div>
            <div> {item.energy}{" wh"}</div>
            <div> {"2023.2.4."}  </div>
          </div>
        ))}
      </div>
    </div>
  )
}