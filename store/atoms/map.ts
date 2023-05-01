
'use client'
import { atom } from 'jotai'

type TMap = {
  isDrawerOpen: boolean;
  isPaused: boolean;
  isRunInProgress: boolean;
  isGps: boolean | string;
  map: null | any;
  geolocate: null | any;
  isAlertOpen: boolean;
  isTelemetryOpen: boolean; // fixed typo
};

const mapState = {
  isDrawerOpen: false,
  isTelemtryOpen: false,
  isAlertOpen: false,
  isGps: false,
  map: null,
  geolocate: null,
  isRunInProgress: false,
  isPaused: false,
};

// ****************** atom  ******************

export const Map_map = atom<any>(null);
export const Map_geolocate = atom<any>(null);

export const Map_isGps = atom<any>('');
export const Map_isDrawerOpen = atom<boolean>(false);
export const Map_isPaused = atom<boolean>(false);
export const Map_isRunInProgress = atom<boolean>(false);
export const Map_isAlertOpen = atom<boolean>(false);
export const Map_isTelemetryOpen = atom<boolean>(false);

// ****************** action  ******************

export const ReSet_Map_state = atom(
  null,
  (_get, set) => {
    set(Map_isDrawerOpen, false)
    set(Map_isPaused, false)
    set(Map_isRunInProgress, false)
    set(Map_isAlertOpen, false)
    set(Map_isGps, false)
    set(Map_isTelemetryOpen, false)

    set(Map_map, null)
    set(Map_geolocate, null)
  }
)


// object 를 하나의 atom 으로 만들어서 관리하면, 하나의 요소만 변경해도 전체가 변경되어 리렌더링 되는 문제가 발생하나요?
// Object를 하나의 atom으로 관리하는 경우, 객체 내부의 어떤 속성이 변경되는 경우 해당 객체 전체가 업데이트되어 리렌더링됩니다. 이는 성능에 부정적인 영향을 미칠 수 있습니다. 따라서 객체를 최소한의 단위인 Primitive value로 분할하면, 각 값에 대한 의존성만으로 업데이트 및 랜더링을 실행할 수 있습니다.
// 이는 React의 PureComponent와 같은 메모이제이션 기능과 함께 사용하여 성능 최적화를 위한 방법입니다. 즉, 객체의 구조와 크기에 따라 다르겠지만, 객체의 구조를 고려하여 적절한 atom 생성 및 데이터 구성을 신중하게 고려해야합니다.

// https://docs.pmnd.rs/jotai/guides/optimization#object-atom