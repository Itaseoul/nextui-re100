// https://jotai.org/docs/utilities/storage
// https://www.joshwcomeau.com/react/the-perils-of-rehydration/#code-on-the-client-3
// https://jotai.org/docs/guides/persistence#a-simple-pattern-with-localstorage

'use client'
import { atom } from 'jotai'


// ****************** define  ******************
const liveRunData_LocalS = (key: string, initialValue: any) => {
  const getInitialValue = () => {
    const item = localStorage.getItem(key)
    if (item !== null) {
      return JSON.parse(item)
    }
    return initialValue
  }
  const baseAtom = atom(getInitialValue())

  const derivedAtom = atom(
    (get) => get(baseAtom),
    (get, set, update) => {
      const nextValue =
        typeof update === 'function' ? update(get(baseAtom)) : update
      set(baseAtom, nextValue)
      localStorage.setItem(key, JSON.stringify(nextValue))
    }
  )
  return derivedAtom
}

// ****************** atom  ******************

export const liveRunDataLS = liveRunData_LocalS("liveRun", "")