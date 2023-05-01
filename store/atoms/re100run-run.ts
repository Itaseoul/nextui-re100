import { R100RunT, R100RunT_I } from "@/types/collections";
import { atom } from "jotai";
// 아톰을 컨텍스트-(value=함수)와 같이 쓴다. 
export const energyHistory = atom<string>("");


export type powerStatsT = {
  "number_of_runs": number,
  "total_distance": number,
  "total_power": number,
  "total_time": number,
}

type runDataT = {
  distance: string;
  duration: number | string;
  startTime: number | Date;
  coords: number[];
}



export const R100RunAtom = atom<R100RunT[]>([]);
export const R100PowerStatsAtom = atom<powerStatsT>({} as powerStatsT);

// energy run record & insert 
export const R_distance = atom<string>("0.00"); // meters
export const R_duration = atom<any>(0); // seconds
export const R_coords = atom<any>([]); // [lat, lng]
export const R_start_place = atom<any>([]); // [lat, lng]
export const R_end_place = atom<any>([]); // [lat, lng]
export const R_start = atom<string>(''); // Date
export const R_end = atom<string>(''); // Date




export const DummyEnergyHistoryAtom = atom(
  [
    {
      "id": "222-3323",
      "profile_id": "이기훈",
      "start": "2022-01-01 23:02:22",
      "end": "2022-01-01 24:08:02",
      "energy": 92.0,
      "location": "서울특별시 강남구 역삼동 123-1"
    },

    {
      "id": "222-33253",
      "profile_id": "이기훈",
      "start": "2022-01-01 23:02:22",
      "end": "2022-01-01 24:08:02",
      "energy": 92.0,
      "location": "서울특별시 강남구 역삼동 123-1"
    },

    {
      "id": "222-3353",
      "profile_id": "이기훈",
      "start": "2022-01-01 23:02:22",
      "end": "2022-01-01 24:08:02",
      "energy": 92.0,
      "location": "서울특별시 강남구 역삼동 123-1"
    }
  ]
)
