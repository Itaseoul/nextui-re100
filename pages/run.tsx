import React from 'react'
import Run from '../components/content/run'
import { RunLayout } from '../components/layout/run-layout'

type Props = {}

export default function Index({ }: Props) {
  return (
    <RunLayout >
      <Run />
    </RunLayout>
  )
}