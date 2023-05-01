import { atom } from 'jotai';

export type TRun = {
  distance: any;
  duration: any;
  startTime: any;
  coords: any;
};

export type runHistory = {
  runs: {
    [key: string]: TRun;
  };
};




// ****************** atom  ******************
export const runHistory = atom<runHistory>({
  runs: {},
});


// ****************** action  ******************
export const setRunHistory = atom(
  null,
  (get, set, value: [string, TRun]) => {
    const [key, run] = value;
    set(runHistory, (history) => ({
      ...history,
      runs: { ...history.runs, [key]: run }
    }));
  }
);

export const deleteRun = atom(
  null,
  (get, set, id: string) => {
    const { runs } = get(runHistory);
    const newRuns = { ...runs };
    delete newRuns[id];
    set(runHistory, { runs: newRuns });
  }
);


export const setFetchedHistory = atom(
  (get) => get(runHistory),
  (get, set, newRuns) => {
    const newState = Object.assign({}, get(runHistory), {
      runs: newRuns,
    });

    return newState;
  }
);

    // dispatch(setRunHistory([startTime, { distance, duration, startTime }]));
