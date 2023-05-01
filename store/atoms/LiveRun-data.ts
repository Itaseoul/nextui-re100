
// https://jotai.org/docs/utilities/storage
// https://www.joshwcomeau.com/react/the-perils-of-rehydration/#code-on-the-client-3
// https://jotai.org/docs/guides/persistence#a-simple-pattern-with-localstorage

'use client'
import { atom } from 'jotai'
import { atomWithStorage, RESET } from 'jotai/utils'

type TData = {
  distance: string;
  duration: number | string;
  startTime: number | Date;
  coords: number[];
}

const initial = {
  distance: "0.00",
  duration: 0,
  startTime: 0,
  coords: [],
}

interface GeoJSONPoint {
  type: 'Point';
  coordinates: number[];
}

type Position = [number, number];
// const positions: Position[] = [[37.12345, -120.54321], [38.6789, -121.8765]];


// ****************** atom  ******************

export const Run_distance = atom<string>("0.00");
export const Run_duration = atom<any>(0);
export const Run_startTime = atom<any>(0);
export const Run_coords = atom<Position[]>([]);

export const liveRunDataLS = atomWithStorage("liveRun", "")


// ****************** action  ******************

export const Set_pushCoords = atom(
  null,
  (get, set, arg: Position) => {
    set(Run_coords, [...get(Run_coords), arg])
  }
);


export const Set_Reset_Rundata = atom(
  null,
  (_get, set) => {
    set(Run_distance, "0.00")
    set(Run_duration, 0)
    set(Run_startTime, 0)
    set(Run_coords, [])
  }
)
// setRunHistory
// deleteRun
// setFetchedHistory
/**
거리 는 km 이다.
활동시간 은 초 단위이다.
시작시간은 시작시간 이며 date 객체이다.
증료시간은 시작시간에 활동시간을 더해서 구한다.
좌표는 위도 경도 배열이다.
*/


/**
useSetAtom, useAtomValue 는 각각 읽기, 쓰기만 가져와서 사용하기 때문에 useAtom 과 다르게 재랜더링 하지 않는 장점이 있다.


*/

// const SET_DISTANCE = "data/set_telemetry";
// const SET_DURATION = "data/set_running_time";
// const SET_START_TIME = "data/set_start_time";
// const SET_COORDS = "data/set_coords";
// const RESET_DATA_STATE = "data/reset_data_state";