'use client';
import React from 'react'
import { atom } from 'jotai'


type Ttab = "main" | "run" | "history" | "detail"
const tab = atom<Ttab>("main")


export default function Tab() {

  const tabName = ["main", "run", "history", "detail"]
  return (
    <div>
      {tabName?.map((item, index) => (
        <div key={index}>
          {item}
        </div>
      ))}

    </div>
  )
}